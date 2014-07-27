account-manager
===============

account-manager is a web application to manage your bank account and always be aware of present and future balance.


This application uses Sailsjs on server (a Realtime MVC framework for Nodejs [Sails website](http://sailsjs.org/))
and Angular for the front

Keep in mind this application is under continuous development.

Stable version is : 0.4.0 and features are :
- Add accounts
- Add outgoings on accounts
- View difference between real and future Account balance (cool thing isn't?)

# Browser-sync

You can use browser-sync as:

        $ cd /vagrant
        $ browser-sync start --files ".tmp/public/styles/*.css, .tmp/public/templates/*.html" --proxy localhost:1337 --host 192.168.0.18

With Docker :

    $ docker run -it -v $(pwd):/data -p 1337:1337 --rm rdroro/nodejs nodemon app.js

@Todo 
- find a best practice to manager asynchrononous issue (see model.Account.userIsOwner)
- feature: Add user and the default user
- documentation: Write user guide
- unit and fonctionnal test
- feature : Add recurrent outgoing
- deploy mongodb