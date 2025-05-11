[<h1 align="center">Quantum Grid</h1>](https://www.QuantumGrid.info)

<h3 align=center>

| [ENGLISH](#english) | [БЪЛГАРСКИ](#bulgarian) | [PORTUGUÊS-BR](#portuguese-br) | [中文](#mandarin) | [ESPAÑOL](#spanish) | [हिंदी](#hindi) | [РУССКИЙ](#russian) |

</h3>

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## <a name="english">What is QuantumGrid?</a>
Quantum Grid is a program that synchronizes computational power between multiple devices allowing for easy horizontal scaling. The program handles the data distribution to the different connected devices, which leaves the user to decide how they want the data to be processed on the previously mentioned connected devices with a software they make. Quantum Grid can also be a volunteer computing system, if you so wish it to be. The distribution currently only works with MongoDB. 

QuantumGrid is a Distributed Computing Framework. QuantumGrid's software lets you create a server which distributes data to a device as well as the software for processing that data. QuantumGrid's software also lets devices connect to the specific server they want to connect with which automatically starts using their processing power to contribute to processing the data.

### Works With:
1. MongoDB
1. Local JSON

### Creating the Server
1. Download the Quantum Grid software:
   - PC
   - Mac
   - Linux
1. In the **Create Server** tab, customize your server according to the information you'll be distributing.
1. After creating your server, you'll be redirected to a folder where the express server is stored.
1. Place your information in the **"data"** folder or on MongoDB.
1. Your server is now ready. There are two ways to run it:
   - **Cloud**: You can host your server on a VPS (Virtual Private Server). Each VPS has its own setup instructions. Hosting on a VPS ensures 24/7 operation.
   - **Locally**: You can host the server on your own computer. The server will run as long as your computer is running.
1. You can check all activities and logs in the **"logs"** folder.

### On data distribution choice
1. MongoDB
1. SQL
1. (local) JSON
1. (local) Files

### Connecting to the Server
1. Download the Quantum Grid software:
   - PC
   - Mac
   - Linux
1. In the **Connect** tab, enter the base URL of the server you want to contribute to:
   - Example: https://volunteerproject.com/work/distribute
1. By default, Quantum Grid will use all your resources, but you can modify this in the **Specifications** page.
1. That's it! You're now actively contributing to the project until you stop or there's no data available for processing.

---

### What's Happening Under the Hood

#### When You're Creating a Server - A production-ready Express.js server is set up.

#### When You're Connecting to a Server - Your device tries to establish a WebSocket connection with the server

## <a name="bulgarian">Какво е Квантов Грид?</a>
Квантов Грид е програма, която синхронизира изчислителната мощност между множество устройства, позволявайки лесно хоризонтално мащабиране. Програмата управлява разпределението на данните към различните свързани устройства, което позволява на потребителя да реши как иска данните да бъдат обработени на споменатите свързани устройства с софтуер, който той създава. Квантов Грид може също да бъде система за доброволни изчисления, ако желаете. Разпределението в момента работи само с MongoDB.

Квантов Грид е рамка за разпределени изчисления. Софтуерът на Квантов Грид ви позволява да създадете сървър, който разпределя данни към устройство, както и софтуер за обработка на тези данни. Софтуерът на Квантов Грид също така позволява на устройства да се свързват със специфичен сървър, към който искат да се присъединят, като автоматично започват да използват изчислителната си мощност, за да допринасят за обработката на данните.

### Работи с:
1. MongoDB
2. Локален JSON

### Създаване на сървър
1. Изтеглете софтуера на Квантов Грид:
   - PC
   - Mac
   - Linux
2. В раздела **Създай Сървър** персонализирайте сървъра според информацията, която ще разпространявате.
3. След създаването на сървъра ще бъдете пренасочени към папка, където се съхранява express сървърът.
4. Поставете вашата информация в папката **"data"** или в MongoDB.
5. Вашият сървър вече е готов. Има два начина да го стартирате:
   - **В облак (Cloud)**: Можете да хоствате сървъра на VPS (Виртуален Частен Сървър). Всеки VPS има свои собствени инструкции за настройка. Хостването на VPS гарантира 24/7 работа.
   - **Локално**: Можете да хоствате сървъра на собствения си компютър. Сървърът ще работи, докато компютърът ви е включен.
6. Можете да проверите всички дейности и логове в папката **"logs"**.

### Избор на разпределение на данни
1. MongoDB
2. SQL
3. (локален) JSON
4. (локални) файлове

### Свързване със сървъра
1. Изтеглете софтуера на Квантов Грид:
   - PC
   - Mac
   - Linux
2. В раздела **Connect** въведете базовия URL на сървъра, към който искате да допринесете:
   - Пример: https://volunteerproject.com/work/distribute
3. По подразбиране Квантов Грид ще използва всички ваши ресурси, но можете да ги промените на страницата **Specifications**.
4. Това е всичко! Вече активно допринасяте към проекта, докато не спрете или няма налични данни за обработка.

---

### Какво се случва под капака

#### Когато създавате сървър - Създава се готов за продукция Express.js сървър.

#### Когато се свързвате със сървър - Вашето устройство се опитва да установи websocket връзка със сървъра.

## <a name="portuguese-br">O que é QuantumGrid?</a>
QuantumGrid é um programa que sincroniza o poder computacional entre múltiplos dispositivos, permitindo fácil escalabilidade horizontal. O programa gerencia a distribuição de dados para os diferentes dispositivos conectados, permitindo que o usuário decida como deseja que os dados sejam processados nos dispositivos conectados mencionados anteriormente com um software que ele cria. O QuantumGrid também pode ser um sistema de computação voluntária, se você assim desejar. A distribuição atualmente funciona apenas com MongoDB.

QuantumGrid é um Framework de Computação Distribuída. O software do QuantumGrid permite que você crie um servidor que distribui dados para um dispositivo, bem como o software para processar esses dados. O software do QuantumGrid também permite que dispositivos se conectem ao servidor específico com o qual desejam se conectar, automaticamente começando a usar seu poder de processamento para contribuir com o processamento dos dados.

### Funciona com:
1. MongoDB
2. JSON Local

### Criando o Servidor
1. Baixe o software Quantum Grid:
   - PC
   - Mac
   - Linux
2. Na aba **Criar Servidor**, personalize seu servidor conforme as informações que deseja distribuir.
3. Após criar seu servidor, você será redirecionado para a pasta onde o servidor express está armazenado.
4. Coloque suas informações na pasta **"data"** ou no MongoDB.
5. Seu servidor está pronto. Há duas maneiras de executá-lo:
   - **Nuvem**: Você pode hospedar seu servidor em um VPS (Servidor Virtual Privado). Cada VPS possui suas próprias instruções de configuração. Hospedar em um VPS garante operação 24/7.
   - **Localmente**: Você pode hospedar o servidor no seu próprio computador. O servidor funcionará enquanto seu computador estiver ligado.
6. Você pode verificar todas as atividades e registros na pasta **"logs"**.

### Sobre a escolha de distribuição de dados
1. MongoDB
2. SQL
3. (local) JSON
4. (local) Arquivos

### Conectando-se ao Servidor
1. Baixe o software Quantum Grid:
   - PC
   - Mac
   - Linux
2. Na aba **Conectar**, insira a URL base do servidor ao qual deseja contribuir:
   - Exemplo: https://volunteerproject.com/work/distribute
3. Por padrão, o Quantum Grid usará todos os seus recursos, mas você pode modificar isso na página **Especificações**.
4. Pronto! Agora você está contribuindo ativamente para o projeto até que pare ou não haja mais dados disponíveis para processamento.

---

### O Que Acontece nos Bastidores

#### Quando Você Cria o Servidor - Um servidor Express.js pronto para produção é configurado.

#### Quando Você se Conecta ao Servidor - Seu dispositivo tenta estabelecer uma conexão WebSocket com o servidor.

## <a name="mandarin">什么是 QuantumGrid？</a>
QuantumGrid 是一个在多个设备之间同步计算能力的程序，允许轻松的水平扩展。该程序管理数据分发到不同的连接设备，让用户决定如何使用他们创建的软件在之前提到的连接设备上处理数据。如果您愿意，QuantumGrid 也可以是一个志愿计算系统。目前分发仅适用于 MongoDB。

QuantumGrid 是一个分布式计算框架。QuantumGrid 的软件允许您创建一个服务器，该服务器将数据分发到设备，以及用于处理这些数据的软件。QuantumGrid 的软件还允许设备连接到他们想要连接的特定服务器，自动开始使用其处理能力来帮助处理数据。

### 支持：
1. MongoDB
2. 本地 JSON

### 创建服务器
1. 下载 Quantum Grid 软件：
   - PC
   - Mac
   - Linux
2. 在 **创建服务器** 选项卡中，根据您要分发的信息自定义服务器。
3. 创建服务器后，您将被重定向到存储 express 服务器的文件夹。
4. 将您的信息放入 **"data"** 文件夹或 MongoDB 中。
5. 服务器已准备就绪。您可以通过两种方式运行它：
   - **云端**：您可以将服务器托管在 VPS（虚拟专用服务器）上。每个 VPS 都有不同的设置说明。托管在 VPS 上可以保证服务器 24/7 运行。
   - **本地**：您可以在自己的计算机上托管服务器。只要计算机运行，服务器就会继续运行。
6. 您可以在 **"logs"** 文件夹中检查所有活动和日志。

### 数据分发选择
1. MongoDB
2. SQL
3. （本地）JSON
4. （本地）文件

### 连接到服务器
1. 下载 Quantum Grid 软件：
   - PC
   - Mac
   - Linux
2. 在 **连接** 选项卡中，输入您想要贡献的服务器的基本 URL：
   - 示例：https://volunteerproject.com/work/distribute
3. 默认情况下，Quantum Grid 将使用您的所有资源，但您可以在 **规格** 页面修改此设置。
4. 就这样！您现在正在积极贡献该项目，直到您停止或没有可处理的数据。

---

### 内部工作原理

#### 当您创建服务器时 - 设置一个适用于生产环境的 Express.js 服务器。

#### 当您连接到服务器时 - 您的设备尝试与服务器建立 WebSocket 连接。

## <a name="spanish">¿Qué es QuantumGrid?</a>
QuantumGrid es un programa que sincroniza el poder computacional entre múltiples dispositivos, permitiendo una fácil escalabilidad horizontal. El programa maneja la distribución de datos a los diferentes dispositivos conectados, lo que permite al usuario decidir cómo quiere que los datos sean procesados en los dispositivos conectados mencionados anteriormente con un software que él crea. QuantumGrid también puede ser un sistema de computación voluntaria, si así lo deseas. La distribución actualmente solo funciona con MongoDB.

QuantumGrid es un Framework de Computación Distribuida. El software de QuantumGrid te permite crear un servidor que distribuye datos a un dispositivo, así como el software para procesar esos datos. El software de QuantumGrid también permite que los dispositivos se conecten al servidor específico con el que desean conectarse, comenzando automáticamente a usar su poder de procesamiento para contribuir al procesamiento de los datos.

### Funciona con:
1. MongoDB
2. JSON Local

### Creación del Servidor
1. Descargue el software Quantum Grid:
   - PC
   - Mac
   - Linux
2. En la pestaña **Crear Servidor**, personalice su servidor según la información que va a distribuir.
3. Después de crear su servidor, será redirigido a una carpeta donde se almacena el servidor express.
4. Coloque su información en la carpeta **"data"** o en MongoDB.
5. Su servidor está listo. Hay dos formas de ejecutarlo:
   - **Nube**: Puede alojar su servidor en un VPS (Servidor Privado Virtual). Cada VPS tiene sus propias instrucciones de configuración. Alojarlo en un VPS garantiza operación 24/7.
   - **Localmente**: Puede alojar el servidor en su propia computadora. El servidor funcionará mientras su computadora esté encendida.
6. Puede verificar todas las actividades y registros en la carpeta **"logs"**.

### Sobre la elección de distribución de datos
1. MongoDB
2. SQL
3. (local) JSON
4. (local) Archivos

### Conectándose al Servidor
1. Descargue el software Quantum Grid:
   - PC
   - Mac
   - Linux
2. En la pestaña **Conectar**, ingrese la URL base del servidor al que desea contribuir:
   - Ejemplo: https://volunteerproject.com/work/distribute
3. De forma predeterminada, Quantum Grid utilizará todos sus recursos, pero puede modificar esto en la página **Especificaciones**.
4. ¡Listo! Ahora está contribuyendo activamente al proyecto hasta que se detenga o no haya más datos disponibles para procesar.

---

### Qué Sucede Detrás de Escena

#### Cuando Crea el Servidor - Se configura un servidor Express.js listo para producción.

#### Cuando Se Conecta al Servidor - Su dispositivo intenta establecer una conexión WebSocket con el servidor.

## <a name="hindi">क्वांटम ग्रिड क्या है?</a>
क्वांटम ग्रिड एक ऐसा प्रोग्राम है जो कई उपकरणों के बीच कम्प्यूटेशनल पावर को सिंक्रोनाइज़ करता है, जिससे आसानी से होरिज़ॉन्टल स्केलिंग संभव होती है। यह प्रोग्राम विभिन्न कनेक्टेड उपकरणों के लिए डेटा डिस्ट्रीब्यूशन को हैंडल करता है, जिससे यूज़र यह तय कर सकता है कि वह अपने बनाए गए सॉफ्टवेयर के साथ पहले बताए गए कनेक्टेड उपकरणों पर डेटा को कैसे प्रोसेस करना चाहता है। यदि आप चाहें तो क्वांटम ग्रिड एक वॉलंटियर कम्प्यूटिंग सिस्टम भी हो सकता है। वर्तमान में डिस्ट्रीब्यूशन केवल MongoDB के साथ काम करता है।

क्वांटम ग्रिड एक डिस्ट्रीब्यूटेड कम्प्यूटिंग फ्रेमवर्क है। क्वांटम ग्रिड का सॉफ्टवेयर आपको एक सर्वर बनाने की अनुमति देता है जो डेटा को एक उपकरण पर डिस्ट्रीब्यूट करता है, साथ ही उस डेटा को प्रोसेस करने के लिए सॉफ्टवेयर भी प्रदान करता है। क्वांटम ग्रिड का सॉफ्टवेयर उपकरणों को उस विशिष्ट सर्वर से कनेक्ट होने की भी अनुमति देता है जिससे वे कनेक्ट करना चाहते हैं, जो स्वचालित रूप से डेटा प्रोसेसिंग में योगदान देने के लिए अपनी प्रोसेसिंग पावर का उपयोग शुरू कर देता है।

### काम करता है:
1. MongoDB
2. लोकल JSON

### सर्वर बनाना
1. क्वांटम ग्रिड सॉफ्टवेयर डाउनलोड करें:
   - PC
   - Mac
   - Linux
2. **सर्वर बनाएं** टैब में, अपने सर्वर को उस जानकारी के अनुसार अनुकूलित करें जिसे आप वितरित करना चाहते हैं।
3. सर्वर बनाने के बाद, आपको उस फ़ोल्डर में पुनः निर्देशित किया जाएगा जहां express सर्वर संग्रहीत है।
4. अपनी जानकारी **"data"** फ़ोल्डर में या MongoDB में रखें।
5. आपका सर्वर अब तैयार है। इसे चलाने के दो तरीके हैं:
   - **क्लाउड**: आप अपने सर्वर को VPS (वर्चुअल प्राइवेट सर्वर) पर होस्ट कर सकते हैं। प्रत्येक VPS की अपनी सेटअप प्रक्रिया होती है। VPS पर होस्ट करने से 24/7 संचालन सुनिश्चित होता है।
   - **स्थानीय रूप से**: आप अपने कंप्यूटर पर सर्वर को होस्ट कर सकते हैं। जब तक आपका कंप्यूटर चालू रहेगा, सर्वर भी चालू रहेगा।
6. आप सभी गतिविधियों और लॉग की जांच **"logs"** फ़ोल्डर में कर सकते हैं।

### डेटा डिस्ट्रीब्यूशन चॉइस पर
1. MongoDB
2. SQL
3. (लोकल) JSON
4. (लोकल) फाइल्स

### सर्वर से कनेक्ट करना
1. क्वांटम ग्रिड सॉफ्टवेयर डाउनलोड करें:
   - PC
   - Mac
   - Linux
2. **कनेक्ट** टैब में, उस सर्वर का बेस URL दर्ज करें जिसमें आप योगदान देना चाहते हैं:
   - उदाहरण: https://volunteerproject.com/work/distribute
3. डिफ़ॉल्ट रूप से, क्वांटम ग्रिड आपके सभी रिसोर्सेज का उपयोग करेगा, लेकिन आप इसे **स्पेसिफिकेशन्स** पेज पर संशोधित कर सकते हैं।
4. बस इतना ही! अब आप सक्रिय रूप से इस प्रोजेक्ट में योगदान कर रहे हैं जब तक कि आप इसे रोक नहीं देते या तब तक प्रोसेसिंग के लिए डेटा उपलब्ध नहीं रहता।

---

### पर्दे के पीछे क्या होता है

#### जब आप सर्वर बनाते हैं - एक प्रोडक्शन-रेडी Express.js सर्वर सेट किया जाता है।

#### जब आप सर्वर से कनेक्ट होते हैं - आपका डिवाइस सर्वर के साथ WebSocket कनेक्शन स्थापित करने का प्रयास करता है।

## <a name="russian">Что такое QuantumGrid?</a>
QuantumGrid - это программа, которая синхронизирует вычислительную мощность между несколькими устройствами, позволяя легко масштабировать систему горизонтально. Программа управляет распределением данных между различными подключенными устройствами, что позволяет пользователю решать, как он хочет обрабатывать данные на упомянутых подключенных устройствах с помощью созданного им программного обеспечения. QuantumGrid также может быть системой добровольных вычислений, если вы этого пожелаете. В настоящее время распределение работает только с MongoDB.

QuantumGrid - это фреймворк распределенных вычислений. Программное обеспечение QuantumGrid позволяет вам создать сервер, который распределяет данные на устройство, а также программное обеспечение для обработки этих данных. Программное обеспечение QuantumGrid также позволяет устройствам подключаться к конкретному серверу, к которому они хотят подключиться, автоматически начиная использовать свою вычислительную мощность для обработки данных.

### Работает с:
1. MongoDB
2. Локальный JSON

### Создание сервера
1. Скачайте программное обеспечение Quantum Grid:
   - PC
   - Mac
   - Linux
2. В разделе **Создать сервер** настройте сервер в соответствии с информацией, которую вы будете распространять.
3. После создания сервера вы будете перенаправлены в папку, где хранится сервер express.
4. Разместите свою информацию в папке **"data"** или в MongoDB.
5. Ваш сервер готов. Его можно запустить двумя способами:
   - **Облако**: Вы можете разместить сервер на VPS (виртуальном частном сервере). Каждая платформа VPS имеет свои инструкции по настройке. Размещение на VPS обеспечивает круглосуточную работу.
   - **Локально**: Вы можете запустить сервер на своем компьютере. Сервер будет работать, пока ваш компьютер включен.
6. Вы можете проверить все действия и логи в папке **"logs"**.

### О выборе распределения данных
1. MongoDB
2. SQL
3. (локальный) JSON
4. (локальные) файлы

### Подключение к серверу
1. Скачайте программное обеспечение Quantum Grid:
   - PC
   - Mac
   - Linux
2. В разделе **Подключение** введите базовый URL сервера, к которому вы хотите присоединиться:
   - Пример: https://volunteerproject.com/work/distribute
3. По умолчанию Quantum Grid использует все доступные ресурсы, но вы можете изменить это на странице **Спецификации**.
4. Готово! Теперь вы активно участвуете в проекте, пока не остановите процесс или пока не закончится доступная для обработки информация.

---

### Что происходит под капотом

#### Когда вы создаете сервер - Настраивается сервер Express.js, готовый к работе в продакшене.

#### Когда вы подключаетесь к серверу - Ваше устройство пытается установить WebSocket-соединение с сервером.
