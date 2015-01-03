# 配置文件目录说明

## 安装

安装必须手动在服务器上进行。终端目录为`website`的根目录。

### 注意
修改文件 **.config/post-receive** 不会立即生效，直到下次提交成功。

- 安装服务器hook

`post-receive`为服务器hook文件，需要放到git服务器的`website.git/custom_hooks`目录下，替换root为GitLab的namespace。

```shell
sudo rm -fr /home/git/repositories/root/website.git/custom_hooks
sudo -u git -H mkdir /home/git/repositories/root/website.git/custom_hooks
sudo -u git -H chmod 755 /home/git/repositories/root/website.git/custom_hooks
sudo -u git -H cp .config/post-receive /home/git/repositories/root/website.git/custom_hooks/post-receive
sudo -u git -H chmod 755 /home/git/repositories/root/website.git/custom_hooks/post-receive
```

- 配置Gitlab

`gitlab`和`gitlab-shell`目录为Gitlab配置文件，需要复制到`/home/git/gitlab/`和`/home/git/gitlab-shell/`目录中。

```shell
cd /home/git/gitlab/config
sudo -u git -H ln -fs database.yml.mysql database.yml
sudo -u git -H ln -fs gitlab.yml.example gitlab.yml
sudo -u git -H ln -fs unicorn.rb.example unicorn.rb
cd /home/git/gitlab-shell
sudo -u git -H ln -fs config.yml.example config.yml
```

- 加载nginx配置

`sites-available`为nginx的配置文件目录，需要放到`/etc/nginx/sites-available/`目录下。

```shell
sudo cp .config/nginx/sites-available/*.conf /etc/nginx/sites-available/
sudo chown root:root /etc/nginx/sites-available/*.conf
sudo chmod 644 /etc/nginx/sites-available/*.conf
sudo rm /etc/nginx/sites-enabled/*
sudo rm /etc/nginx/conf.d/*.conf
sudo ln -s /etc/nginx/sites-available/*.conf /etc/nginx/conf.d/
sudo service nginx restart
```

或者在gitlab hook可以工作的情况下，直接创建符号链接到`/etc/nginx/conf.d/`目录下。

```shell
sudo rm /etc/nginx/sites-enabled/*
sudo rm /etc/nginx/conf.d/*.conf
sudo ln -s /home/git/config/nginx/sites-available/*.conf /etc/nginx/conf.d/
sudo service nginx restart
```


- 建立html目录和config目录

如果目录已建立确保所有者为git，并且git具有rwx权限。

```shell
sudo -u git -H mkdir /home/git/html/
sudo -u git -H mkdir /home/git/config/
sudo chown git:git /home/git/html/
sudo chown git:git /home/git/config/
sudo chmod 755 /home/git/html/
sudo chmod 755 /home/git/config/
```


- 配置DDNS日志输出脚本

需要添加到开机启动`/etc/rc.local`和定时器`crontab`脚本，

```shell
# /home/git/config/update-ddns startup
sudo vim /etc/rc.local         # Add this line before 'exit 0'

# */15 * *   *   *     /home/git/config/update-ddns >/dev/null 2>&1
sudo -u git -H crontab -e      # Add this line at the end
```


## Push事件

- 每次push events会通过Gitlab hook调用`.config/post-receive`文件，其将更新配置和网站文件，并调用`.config/post-events`完成结束工作。


- 此目录会在上载到服务器端后自动删除。
