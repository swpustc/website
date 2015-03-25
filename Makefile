all:
	date -R
	sudo -u git -H config/make

upgrade:
	date -R
	sudo -u swp -H config/make upgrade
	sudo service nginx stop
	sudo service php5-fpm stop
	sudo -u git -H config/make
	sudo service php5-fpm start
	sudo service nginx start

sign:
	config/sign-event
