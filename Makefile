all:
	date -R
	sudo -u git -H config/make

upgrade:
	date -R
	sudo -u swp -H config/make upgrade
	sudo service nginx stop
	sudo -u git -H config/make
	sudo service nginx start
