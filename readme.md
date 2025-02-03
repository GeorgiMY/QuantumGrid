### || ENGLISH ||

# Quantum Grid

## Volunteer Computing Framework

### Creating the Server
1. Download the Quantum Grid software:
   - PC
   - Mac
   - Linux
2. In the **Create Server** tab, customize your server according to the information you'll be distributing.
3. After creating your server, you'll be redirected to a folder where the express server is stored.
4. Place your information in the **"data"** folder.
5. Your server is now ready. There are two ways to run it:
   - **Cloud**: You can host your server on a VPS (Virtual Private Server). Each VPS has its own setup instructions. Hosting on a VPS ensures 24/7 operation.
   - **Locally**: You can host the server on your own computer. The server will run as long as your computer is running.
6. You can check all activities and logs in the **"logs"** folder.

### On data distribution choice
1. MongoDB - In the "model" folder under "/server/src/model" you'll have to define a schema which will define what is being distributed
2. SQL
3. (local) JSON
4. (local) Images

### Connecting to the Server
1. Download the Quantum Grid software:
   - PC
   - Mac
   - Linux
2. In the **Connect** tab, enter the base URL of the server you want to contribute to:
   - Example: https://volunteerproject.com
3. By default, Quantum Grid will use all your resources, but you can modify this in the **Specifications** page.
4. That’s it! You’re now actively contributing to the project until you stop or there’s no data available for processing.

---

### What’s Happening Under the Hood

#### When You're Creating the Server:
1. A production-ready Express.js server is set up.
2. When you receive a POST API request, the server checks if the device has already received tasks.

#### When You're Connecting to the Server:
1. Every 5 seconds, your device sends a POST request sharing progress, specifications, and user information.


### || БЪЛГАРСКИ ||

# КВАНТОВ ГРИД

## Рамка за доброволческо изчисление

### СЪРВЪРЪТ

#### Създаване на сървър
1. Изтеглете софтуера Quantum Grid
   - PC
   - Mac
   - Linux
2. В раздела за създаване на сървър персонализирайте сървъра според информацията, която ще разпространявате.
3. След създаването на сървъра ще бъдете пренасочени към папка, в която е запазен express сървърът.
4. Можете да поставите информацията в папката **"data"**.
5. Сега вашият сървър е готов и остава само да го стартирате. Има два начина да го направите:
   - **Облачно** - Можете да хоствате сървъра си на VPS (Виртуален частен сървър). Всеки VPS има различни начини за настройка. Така разпространението ще се случва 24/7.
   - **Локално** - Можете да хоствате сървъра на вашия компютър. Докато компютърът ви работи, сървърът също ще работи.
6. Можете да проверите всичко, което се случва и е станало от началото на операцията, в папката **"logs"**.

#### Свързване със сървър
1. Изтеглете софтуера Quantum Grid
   - PC
   - Mac
2. В раздела за свързване въведете базовия URL адрес на уебсайта, към който искате да допринесете.
   - Пример: https://volunteerproject.com
3. По подразбиране Quantum Grid ще използва всички ваши ресурси, но можете да промените това на страницата **Specifications**.
4. Това е всичко! Вече активно допринасяте за проекта, докато не спрете или няма налични данни за обработка.

---

### КАКВО СЕ СЛУЧВА ЗАД КУЛИСИТЕ

#### Когато създавате сървър:
1. Настройва се продукционно готов express.js сървър.
2. Когато получите POST API заявка, се изпълнява проверка, за да се установи дали устройството вече е получило задачи.

#### Когато се свързвате със сървър:
1. На всеки 5 секунди изпращате POST заявка, която споделя вашия прогрес, вашите спецификации и информация за потребителя.
