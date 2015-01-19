#!/bin/bash
cd /usr/share/wordpress/
echo Google Service: | ag Google
grep -r fonts.googleapis.com         `pwd` --color=auto
grep -r ajax.googleapis.com          `pwd` --color=auto
grep -r themes.googleusercontent.com `pwd` --color=auto
grep -r fonts.gstatic.com            `pwd` --color=auto
echo Done. | ag Done
echo;
echo Replace... | ag Replace
for file in $(grep -r googleapis\.com `pwd` | awk -F: '{print $1}') ; do
  sed -i "s/fonts.googleapis.com/fonts.lug.ustc.edu.cn/g" $file
  sed -i "s/ajax.googleapis.com/ajax.lug.ustc.edu.cn/g"   $file
done
for file in $(grep -r googleusercontent\.com `pwd` | awk -F: '{print $1}') ; do
  sed -i "s/themes.googleusercontent.com/google-themes.lug.ustc.edu.cn/g" $file
done
for file in $(grep -r gstatic\.com `pwd` | awk -F: '{print $1}') ; do
  sed -i "s/fonts.gstatic.com/fonts-gstatic.lug.ustc.edu.cn/g" $file
done
echo Done. | ag Done
echo;
echo USTC Proxy: | ag USTC
grep -r fonts.lug.ustc.edu.cn         `pwd` --color=auto
grep -r ajax.lug.ustc.edu.cn          `pwd` --color=auto
grep -r google-themes.lug.ustc.edu.cn `pwd` --color=auto
grep -r fonts-gstatic.lug.ustc.edu.cn `pwd` --color=auto
echo Done. | ag Done
echo;
