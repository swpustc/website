all:
	sudo -u git -H config/make

upgrade:
	config/make upgrade
	sudo service nginx stop
	sudo -u git -H config/make
	sudo service nginx start
