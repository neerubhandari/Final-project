import regex  as re
from tldextract import extract
import ssl
import socket
from urllib.parse import urlparse, urlencode
from bs4 import BeautifulSoup
import  bs4
import urllib.request
import whois
import datetime
from googlesearch import search
from whois.tld_regexpr import wiki

def SSLfinal_State(url):
    try:
        # check wheather contains https
        if (re.search('^https', url)):
            usehttps = 1
        else:
            usehttps = 0
        # getting the certificate issuer to later compare with trusted issuer
        # getting host name
        subDomain, domain, suffix = extract(url)
        host_name = domain + "." + suffix
        context = ssl.create_default_context()
        sct = context.wrap_socket(socket.socket(), server_hostname=host_name)
        sct.connect((host_name, 443))
        certificate = sct.getpeercert()
        issuer = dict(x[0] for x in certificate['issuer'])
        certificate_Auth = str(issuer['commonName'])
        certificate_Auth = certificate_Auth.split()
        if (certificate_Auth[0] == "Network" or certificate_Auth == "Deutsche"):
            certificate_Auth = certificate_Auth[0] + " " + certificate_Auth[1]
        else:
            certificate_Auth = certificate_Auth[0]
        trusted_Auth = ['Comodo', 'Symantec', 'GoDaddy', 'GlobalSign', 'DigiCert', 'StartCom',
                        'Entrust', 'Verizon', 'Trustwave', 'Unizeto', 'Buypass', 'QuoVadis',
                        'Deutsche Telekom', 'Network Solutions', 'SwissSign', 'IdenTrust', 'Secom',
                        'TWCA', 'GeoTrust', 'Thawte', 'Doster', 'VeriSign']
        # getting age of certificate
        startingDate = str(certificate['notBefore'])
        endingDate = str(certificate['notAfter'])
        startingYear = int(startingDate.split()[3])
        endingYear = int(endingDate.split()[3])
        Age_of_certificate = endingYear - startingYear

        # checking final conditions
        if ((usehttps == 1) and (certificate_Auth in trusted_Auth) and (Age_of_certificate >= 1)):
            return -1  # legitimate
        elif ((usehttps == 1) and (certificate_Auth not in trusted_Auth)):
            return 0  # suspicious
        else:
            return 1  # phishing

    except Exception as e:
        return -1


def URL_of_Anchor(url):
    try:
        subDomain, domain, suffix = extract(url)
        websiteDomain = domain

        opener = urllib.request.urlopen(url).read()
        soup = BeautifulSoup(opener, 'lxml')
        anchors = soup.findAll('a', href=True)
        total = len(anchors)
        linked_to_same = 0
        avg = 0
        for anchor in anchors:
            subDomain, domain, suffix = extract(anchor['href'])
            anchorDomain = domain
            if (websiteDomain == anchorDomain or anchorDomain == ''):
                linked_to_same = linked_to_same + 1
        linked_outside = total - linked_to_same
        if (total != 0):
            avg = linked_outside / total

        if (avg < 0.31):
            return -1
        elif (0.31 <= avg <= 0.67):
            return 0
        else:
            return 1
    except:
        return 0


def Prefix_Suffix(url):
    match = re.search('-', url)
    if match:
        return 1
    else:
        return -1


"""#### **3.2.2. Web Traffic**
This feature measures the popularity of the website by determining the number of visitors and the number of pages they visit. However, since phishing websites live for a short period of time, they may not be recognized by the Alexa database (Alexa the Web Information Company., 1996). By reviewing our dataset, we find that in worst scenarios, legitimate websites ranked among the top 100,000. Furthermore, if the domain has no traffic or is not recognized by the Alexa database, it is classified as “Phishing”.
If the rank of the domain < 100000, the vlaue of this feature is -1 (legitimate) else (phishing).
"""


def web_traffic(url):
    try:
        rank = \
            bs4.BeautifulSoup(
                urllib.request.urlopen("http://data.alexa.com/data?cli=10&dat=s&url=" + url).read(),
                "xml").find(
                "REACH")['RANK']
    except TypeError:
        return 1
    rank = int(rank)
    return -1 if rank < 100000 else 0


def having_Sub_Domain(url):
    if (having_IP_Address(url) == 1):
        match = re.search(
            '(([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5]))|(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}',
            url)
        pos = match.end(0)
        url = url[pos:]
    list = [x.start(0) for x in re.finditer('\.', url)]
    if len(list) > 3:
        return 1
    elif len(list) == 3:
        return 0
    else:
        return -1


def Request_URL(url):
    try:
        subDomain, domain, suffix = extract(url)
        websiteDomain = domain

        opener = urllib.request.urlopen(url).read()
        soup = BeautifulSoup(opener, 'lxml')
        imgs = soup.findAll('img', src=True)
        total = len(imgs)

        linked_to_same = 0
        avg = 0
        for image in imgs:
            subDomain, domain, suffix = extract(image['src'])
            imageDomain = domain
            if (websiteDomain == imageDomain or imageDomain == ''):
                linked_to_same = linked_to_same + 1
        vids = soup.findAll('video', src=True)
        total = total + len(vids)

        for video in vids:
            subDomain, domain, suffix = extract(video['src'])
            vidDomain = domain
            if (websiteDomain == vidDomain or vidDomain == ''):
                linked_to_same = linked_to_same + 1
        linked_outside = total - linked_to_same
        if (total != 0):
            avg = linked_outside / total

        if (avg < 0.22):
            return -1
        elif (0.22 <= avg <= 0.61):
            return 0
        else:
            return 1
    except:
        return 0


def Links_in_tags(url):
    try:
        opener = urllib.request.urlopen(url).read()
        soup = BeautifulSoup(opener, 'lxml')

        no_of_meta = 0
        no_of_link = 0
        no_of_script = 0
        anchors = 0
        avg = 0
        for meta in soup.find_all('meta'):
            no_of_meta = no_of_meta + 1
        for link in soup.find_all('link'):
            no_of_link = no_of_link + 1
        for script in soup.find_all('script'):
            no_of_script = no_of_script + 1
        for anchor in soup.find_all('a'):
            anchors = anchors + 1
        total = no_of_meta + no_of_link + no_of_script + anchors
        tags = no_of_meta + no_of_link + no_of_script
        if (total != 0):
            avg = tags / total
            if (avg < 0.17):
                return -1
            elif (0.17 <= avg <= 0.67):
                return 0
            else:
                return 1
        else:
            return -1
    except:
        return 0


def SFH(url):
    opener = urllib.request.urlopen(url).read()
    soup = BeautifulSoup(opener, 'lxml')
    domain = extract(url)
    for form in soup.find_all('form', action=True):
        if str(form['action']) == "" or str(form['action']) == "about:blank":
            return 1
        elif wiki not in str(form['action']) and domain not in str(form['action']):
            return 0
        else:
            return -1
    return -1


def Google_Index(url):
    site = search(url, 5)
    if site:
        return -1
    else:
        return 1


def age_of_domain(url):
    try:
        w = whois.whois(url)
        start_date = w.creation_date
        current_date = datetime.datetime.today()
        age = (current_date - start_date[0]).days
        if (age >= 180):
            return -1
        else:
            return 1
    except Exception as e:
        return 0


def Page_Rank(url):
    return -1


def having_IP_Address(url):
    match = re.search(
        '(([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.'
        '([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\/)|'  # IPv4
        '((0x[0-9a-fA-F]{1,2})\\.(0x[0-9a-fA-F]{1,2})\\.(0x[0-9a-fA-F]{1,2})\\.(0x[0-9a-fA-F]{1,2})\\/)'  # IPv4 in hexadecimal
        '(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}', url)  # Ipv6
    if match:
        # print match.group()
        return -1
    else:
        # print 'No matching pattern found'
        return 1


def Statistical_report(url):
    return -1


def DNSRecord(url):
    dns = 0
    try:
        domain_name = whois.whois(urlparse(url).netloc)
        # rint(domain_name)
    except:
        dns = 1

    if dns == 1:
        return 1
    else:
        return -1


def URL_Length(url):
    if len(url) < 54:
        return -1
    elif len(url) >= 54 and len(url) <= 75:
        return 0
    else:
        return 1


def having_At_Symbol(url):
    if url.count('@') >= 1:
        return 1
    else:
        return -1


def on_mouseover(url):
    return -1


status_port = []
import socket


def port(url):
    return -1


def Links_pointing_to_page(url):
    try:
        opener = urllib.request.urlopen(url).read()
        soup = BeautifulSoup(opener, 'lxml')
        no_of_link = 0
        for link in soup.find_all('link'):
            no_of_link = no_of_link + 1
        if no_of_link > 0:
            return 1
        else:
            return -1
    except:
        return -1


def Submitting_to_email(url):
    try:
        opener = urllib.request.urlopen(url).read()
        soup = BeautifulSoup(opener, 'lxml')
        if (soup.find('mailto:')):
            return 1
        else:
            return -1
    except:
        return 0


def RightClick(url):
    return 1


def popUpWidnow(url):
    return -1

def main(url):
    check=[[SSLfinal_State(url),URL_of_Anchor(url),Prefix_Suffix(url),web_traffic(url),having_Sub_Domain(url),Request_URL(url),
Links_in_tags(url),SFH(url),Google_Index(url),age_of_domain(url),Page_Rank(url),having_IP_Address(url),Statistical_report(url),DNSRecord(url)
,URL_Length(url),having_At_Symbol(url),on_mouseover(url),port(url),Links_pointing_to_page(url),Submitting_to_email(url),RightClick(url),popUpWidnow(url)]]

    print(check)
    return check