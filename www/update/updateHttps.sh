
#!/bin/bash
 cd /usr/local/ssl/certs
 python3 acme_tiny.py --account-key account.key --csr domain.csr --acme-dir /home/wwwroot/www.songxiaocai.com/.well-known/acme-challenge > www.songxiaocai.com.signed.crt || exit
 wget -O - https://letsencrypt.org/certs/lets-encrypt-x1-cross-signed.pem > intermediate.pem
 cat www.songxiaocai.com.signed.crt intermediate.pem > chained.pem
 
/usr/nginx-1.6.3/objs/nginx -s reload
