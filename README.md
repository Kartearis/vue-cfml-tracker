# CFML Error tracker UI

Фронтенд для трекера ошибок.
Написан на Vue2 + Vuetify.

Реализовано:
- Просмотр ошибок
- Сортировка ошибок по разным критериям при просмотре
- Поиск по ошибкам
- Редактирование записей об ошибках с добавлением комментария 
(смена статуса ограничена согласно диаграмме ЖЦ ошибки)
- Добавление новых записей об ошибках
- Просмотр сведений о пользователях
- Редактирование сведений о пользователях (имя и фамилия)
- Добавление новых пользователей
- Авторизация и выход из аккаунта

## Скриншоты
![image](https://user-images.githubusercontent.com/32914913/191366368-cd525d5b-07fe-4f12-beee-8fd34472de70.png)
![image](https://user-images.githubusercontent.com/32914913/191366443-69e387ba-d34a-4472-b882-c88d4d6e82bd.png)
![image](https://user-images.githubusercontent.com/32914913/191366410-beea3cd7-72b8-4205-94ca-bd0d8a3aa1f9.png)
![image](https://user-images.githubusercontent.com/32914913/191366478-969b871a-12fc-45b6-be94-d9b2f5454357.png)
![image](https://user-images.githubusercontent.com/32914913/191366493-87c3ebaf-7c5f-4ec2-9a85-16ec061dddae.png)
![image](https://user-images.githubusercontent.com/32914913/191366539-68330946-1cc3-49af-900d-acdc1f53a8a1.png)

## Запуск
Используйте следующие команды в папке репозитория (требуется nodejs):
```
npm i
npm run serve
```

Это запустит фронтенд по адресу [127.0.0.1:8080](http://127.0.0.1:8080). 
Для нормальной работы также должен быть запущен бэкенд.

Так как в серверной части не настроен CORS, нужно использовать расширение, которое
отключит в браузере проверки CORS, например [это](https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino/).
Расширение должно быть включено, иначе запросы не будут корректно отправлены на сервер.


## А где бэкенд?
[Тут](https://github.com/Kartearis/cfml-et-rest)
