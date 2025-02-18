[<h1 align="center">Quantum Grid</h1>](https://www.QuantumGrid.info)

<h3 align=center>

| [ENGLISH](#english) | [BULGARIAN](#bulgarian) | [PORTUGUÊS-BR](#portuguese-br) | [中文](#mandarin) | [ESPAÑOL](#spanish) | [हिंदी](#hindi) | [РУССКИЙ](#russian) |

</h3>

## <a name="english">What is QuantumGrid?</a> 
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
1. Place your information in the **"data"** folder.
1. Your server is now ready. There are two ways to run it:
   - **Cloud**: You can host your server on a VPS (Virtual Private Server). Each VPS has its own setup instructions. Hosting on a VPS ensures 24/7 operation.
   - **Locally**: You can host the server on your own computer. The server will run as long as your computer is running.
1. You can check all activities and logs in the **"logs"** folder.

### On data distribution choice
1. MongoDB - In the "model" folder under "/server/src/model" you'll have to define a schema which will define what is being distributed
1. SQL
1. (local) JSON
1. (local) Images

### Connecting to the Server
1. Download the Quantum Grid software:
   - PC
   - Mac
   - Linux
1. In the **Connect** tab, enter the base URL of the server you want to contribute to:
   - Example: https://volunteerproject.com
1. By default, Quantum Grid will use all your resources, but you can modify this in the **Specifications** page.
1. That’s it! You’re now actively contributing to the project until you stop or there’s no data available for processing.

---

### What’s Happening Under the Hood

#### When You're Creating a Server - A production-ready Express.js server is set up.

#### When You're Connecting to a Server - Your device tries to establish a websocket connection with the server

# <a name="bulgarian"></a>КВАНТОВ ГРИД

## Рамка за доброволческо изчисление

### СЪРВЪРЪТ

#### Създаване на сървър
1. Изтеглете софтуера Quantum Grid
   - PC
   - Mac
   - Linux
1. В раздела за създаване на сървър персонализирайте сървъра според информацията, която ще разпространявате.
1. След създаването на сървъра ще бъдете пренасочени към папка, в която е запазен express сървърът.
1. Можете да поставите информацията в папката **"data"**.
1. Сега вашият сървър е готов и остава само да го стартирате. Има два начина да го направите:
   - **Облачно** - Можете да хоствате сървъра си на VPS (Виртуален частен сървър). Всеки VPS има различни начини за настройка. Така разпространението ще се случва 24/7.
   - **Локално** - Можете да хоствате сървъра на вашия компютър. Докато компютърът ви работи, сървърът също ще работи.
1. Можете да проверите всичко, което се случва и е станало от началото на операцията, в папката **"logs"**.

#### Свързване със сървър
1. Изтеглете софтуера Quantum Grid
   - PC
   - Mac
1. В раздела за свързване въведете базовия URL адрес на уебсайта, към който искате да допринесете.
   - Пример: https://volunteerproject.com
1. По подразбиране Quantum Grid ще използва всички ваши ресурси, но можете да промените това на страницата **Specifications**.
1. Това е всичко! Вече активно допринасяте за проекта, докато не спрете или няма налични данни за обработка.

---

### КАКВО СЕ СЛУЧВА ЗАД КУЛИСИТЕ

#### Когато създавате сървър:
1. Настройва се продукционно готов express.js сървър.
1. Когато получите POST API заявка, се изпълнява проверка, за да се установи дали устройството вече е получило задачи.

#### Когато се свързвате със сървър:
1. На всеки 5 секунди изпращате POST заявка, която споделя вашия прогрес, вашите спецификации и информация за потребителя.

## <a name="portuguese-br"></a>Framework de Computação Voluntária

### Criando o Servidor
1. Baixe o software Quantum Grid:
   - PC
   - Mac
   - Linux
1. Na aba **Criar Servidor**, personalize seu servidor conforme as informações que deseja distribuir.
1. Após criar seu servidor, você será redirecionado para a pasta onde o servidor express está armazenado.
1. Coloque suas informações na pasta **"data"**.
1. Seu servidor está pronto. Há duas maneiras de executá-lo:
   - **Nuvem**: Você pode hospedar seu servidor em um VPS (Servidor Virtual Privado). Cada VPS possui suas próprias instruções de configuração. Hospedar em um VPS garante operação 24/7.
   - **Localmente**: Você pode hospedar o servidor no seu próprio computador. O servidor funcionará enquanto seu computador estiver ligado.
1. Você pode verificar todas as atividades e registros na pasta **"logs"**.

### Conectando-se ao Servidor
1. Baixe o software Quantum Grid:
   - PC
   - Mac
   - Linux
1. Na aba **Conectar**, insira a URL base do servidor ao qual deseja contribuir:
   - Exemplo: https://volunteerproject.com
1. Por padrão, o Quantum Grid usará todos os seus recursos, mas você pode modificar isso na página **Especificações**.
1. Pronto! Agora você está contribuindo ativamente para o projeto até que pare ou não haja mais dados disponíveis para processamento.

---

### O Que Acontece nos Bastidores

#### Quando Você Cria o Servidor:
1. Um servidor Express.js pronto para produção é configurado.
1. Quando recebe uma solicitação POST da API, o servidor verifica se o dispositivo já recebeu tarefas.

#### Quando Você se Conecta ao Servidor:
1. A cada 5 segundos, seu dispositivo envia uma solicitação POST compartilhando progresso, especificações e informações do usuário.

## <a name="mandarin"></a>志愿计算框架

### 创建服务器
1. 下载 Quantum Grid 软件：
   - PC
   - Mac
   - Linux
1. 在 **创建服务器** 选项卡中，根据您要分发的信息自定义服务器。
1. 创建服务器后，您将被重定向到存储 express 服务器的文件夹。
1. 将您的信息放入 **"data"** 文件夹中。
1. 服务器已准备就绪。您可以通过两种方式运行它：
   - **云端**：您可以将服务器托管在 VPS（虚拟专用服务器）上。每个 VPS 都有不同的设置说明。托管在 VPS 上可以保证服务器 24/7 运行。
   - **本地**：您可以在自己的计算机上托管服务器。只要计算机运行，服务器就会继续运行。
1. 您可以在 **"logs"** 文件夹中检查所有活动和日志。

### 连接到服务器
1. 下载 Quantum Grid 软件：
   - PC
   - Mac
   - Linux
1. 在 **连接** 选项卡中，输入您想要贡献的服务器的基本 URL：
   - 示例：https://volunteerproject.com
1. 默认情况下，Quantum Grid 将使用您的所有资源，但您可以在 **规格** 页面修改此设置。
1. 就这样！您现在正在积极贡献该项目，直到您停止或没有可处理的数据。

---

### 内部工作原理

#### 当您创建服务器时：
1. 一个适用于生产环境的 Express.js 服务器被设置。
1. 当服务器收到 POST API 请求时，它会检查该设备是否已经收到任务。

#### 当您连接到服务器时：
1. 每 5 秒，您的设备会发送一个 POST 请求，分享进度、设备规格和用户信息。


## <a name="spanish"></a>Marco de Computación Voluntaria

### Creación del Servidor
1. Descargue el software Quantum Grid:
   - PC
   - Mac
   - Linux
1. En la pestaña **Crear Servidor**, personalice su servidor según la información que va a distribuir.
1. Después de crear su servidor, será redirigido a una carpeta donde se almacena el servidor express.
1. Coloque su información en la carpeta **"data"**.
1. Su servidor está listo. Hay dos formas de ejecutarlo:
   - **Nube**: Puede alojar su servidor en un VPS (Servidor Privado Virtual). Cada VPS tiene sus propias instrucciones de configuración. Alojarlo en un VPS garantiza operación 24/7.
   - **Localmente**: Puede alojar el servidor en su propia computadora. El servidor funcionará mientras su computadora esté encendida.
1. Puede verificar todas las actividades y registros en la carpeta **"logs"**.

### Conectándose al Servidor
1. Descargue el software Quantum Grid:
   - PC
   - Mac
   - Linux
1. En la pestaña **Conectar**, ingrese la URL base del servidor al que desea contribuir:
   - Ejemplo: https://volunteerproject.com
1. De forma predeterminada, Quantum Grid utilizará todos sus recursos, pero puede modificar esto en la página **Especificaciones**.
1. ¡Listo! Ahora está contribuyendo activamente al proyecto hasta que se detenga o no haya más datos disponibles para procesar.

---

### Qué Sucede Detrás de Escena

#### Cuando Crea el Servidor:
1. Se configura un servidor Express.js listo para producción.
1. Cuando recibe una solicitud API POST, el servidor verifica si el dispositivo ya ha recibido tareas.

#### Cuando Se Conecta al Servidor:
1. Cada 5 segundos, su dispositivo envía una solicitud POST compartiendo progreso, especificaciones e información del usuario.

## <a name="hindi"></a>स्वयंसेवी कंप्यूटिंग फ्रेमवर्क

### सर्वर बनाना
1. Quantum Grid सॉफ़्टवेयर डाउनलोड करें:
   - PC
   - Mac
   - Linux
1. **सर्वर बनाएं** टैब में, अपने सर्वर को उस जानकारी के अनुसार अनुकूलित करें जिसे आप वितरित करना चाहते हैं।
1. सर्वर बनाने के बाद, आपको उस फ़ोल्डर में पुनः निर्देशित किया जाएगा जहां express सर्वर संग्रहीत है।
1. अपनी जानकारी **"data"** फ़ोल्डर में रखें।
1. आपका सर्वर अब तैयार है। इसे चलाने के दो तरीके हैं:
   - **क्लाउड**: आप अपने सर्वर को VPS (वर्चुअल प्राइवेट सर्वर) पर होस्ट कर सकते हैं। प्रत्येक VPS की अपनी सेटअप प्रक्रिया होती है। VPS पर होस्ट करने से 24/7 संचालन सुनिश्चित होता है।
   - **स्थानीय रूप से**: आप अपने कंप्यूटर पर सर्वर को होस्ट कर सकते हैं। जब तक आपका कंप्यूटर चालू रहेगा, सर्वर भी चालू रहेगा।
1. आप सभी गतिविधियों और लॉग की जांच **"logs"** फ़ोल्डर में कर सकते हैं।

### सर्वर से कनेक्ट करना
1. Quantum Grid सॉफ़्टवेयर डाउनलोड करें:
   - PC
   - Mac
   - Linux
1. **कनेक्ट करें** टैब में उस सर्वर का आधार URL दर्ज करें जिससे आप योगदान देना चाहते हैं:
   - उदाहरण: https://volunteerproject.com
1. डिफ़ॉल्ट रूप से, Quantum Grid आपके सभी संसाधनों का उपयोग करेगा, लेकिन आप इसे **विशेष विवरण** पृष्ठ पर संशोधित कर सकते हैं।
1. बस इतना ही! अब आप सक्रिय रूप से इस परियोजना में योगदान कर रहे हैं जब तक कि आप इसे रोक नहीं देते या तब तक डेटा उपलब्ध नहीं रहता।

---

### पर्दे के पीछे क्या होता है

#### जब आप सर्वर बनाते हैं:
1. एक उत्पादन-तैयार Express.js सर्वर सेट किया जाता है।
1. जब कोई POST API अनुरोध प्राप्त होता है, तो सर्वर यह जांचता है कि क्या डिवाइस ने पहले ही कार्य प्राप्त कर लिया है।

#### जब आप सर्वर से कनेक्ट होते हैं:
1. हर 5 सेकंड में, आपका डिवाइस एक POST अनुरोध भेजता है जिसमें प्रगति, विनिर्देश और उपयोगकर्ता जानकारी साझा की जाती है।

## <a name="russian"></a>Рамочная система добровольных вычислений

### Создание сервера
1. Скачайте программное обеспечение Quantum Grid:
   - PC
   - Mac
   - Linux
1. В разделе **Создать сервер** настройте сервер в соответствии с информацией, которую вы будете распространять.
1. После создания сервера вы будете перенаправлены в папку, где хранится сервер express.
1. Разместите свою информацию в папке **"data"**.
1. Ваш сервер готов. Его можно запустить двумя способами:
   - **Облако**: Вы можете разместить сервер на VPS (виртуальном частном сервере). Каждая платформа VPS имеет свои инструкции по настройке. Размещение на VPS обеспечивает круглосуточную работу.
   - **Локально**: Вы можете запустить сервер на своем компьютере. Сервер будет работать, пока ваш компьютер включен.
1. Вы можете проверить все действия и логи в папке **"logs"**.

### Подключение к серверу
1. Скачайте программное обеспечение Quantum Grid:
   - PC
   - Mac
   - Linux
1. В разделе **Подключение** введите базовый URL сервера, к которому вы хотите присоединиться:
   - Пример: https://volunteerproject.com
1. По умолчанию Quantum Grid использует все доступные ресурсы, но вы можете изменить это на странице **Спецификации**.
1. Готово! Теперь вы активно участвуете в проекте, пока не остановите процесс или пока не закончится доступная для обработки информация.

---

### Что происходит под капотом

#### Когда вы создаете сервер:
1. Настраивается сервер Express.js, готовый к работе в продакшене.
1. Когда сервер получает POST-запрос, он проверяет, получало ли это устройство задания ранее.

#### Когда вы подключаетесь к серверу:
1. Каждые 5 секунд ваше устройство отправляет POST-запрос с информацией о ходе работы, спецификациях устройства и данных пользователя.
