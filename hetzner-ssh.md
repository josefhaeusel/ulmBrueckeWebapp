Mac Terminal:
    cd .ssh
    ssh-keygen 
        name: alecscb
        passphrase: empty


Hetzner Cloud Console:
    SSH Keys > ADD SSH KEY

Mac Terminal:
    cat alecscb.pub

    *copy key*

Hetzner:

    *paste key*
    name: alecscb


Mac Terminal:
    ssh root@flachsbruecke-ulm.de
    yes
    yes



Server Terminal

cd ..
cd /var/www/ulmBrueckeWebapp/
git pull
npm run build