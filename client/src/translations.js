const translations = {
	"en": {
		createServer: "Create Server",
		connectServer: "Connect to Server",
		createServerTitle: "Create Volunteer Server",
		createServerDesc:
			"Here you can set up and manage your volunteer computing project. Configure your server settings, define tasks, and monitor project progress.",
		connectServerTitle: "Connect to Server",
		connectServerDesc:
			"Join existing volunteer computing projects. Enter server details, choose projects to contribute to, and start sharing your computer's resources.",
	},
	"bg": {
		createServer: "Създаване на сървър",
		connectServer: "Свързване към сървър",
		createServerTitle: "Създаване на доброволчески сървър",
		createServerDesc:
			"Тук можете да настроите и управлявате вашия проект за доброволчески изчисления. Конфигурирайте настройките на сървъра, определете задачи и наблюдавайте напредъка на проекта.",
		connectServerTitle: "Свързване към сървър",
		connectServerDesc:
			"Присъединете се към съществуващи проекти за доброволчески изчисления. Въведете данни за сървъра, изберете проекти, към които да допринесете, и започнете да споделяте ресурсите на вашия компютър.",
	},
	"zh": {
		createServer: "创建服务器",
		connectServer: "连接到服务器",
		createServerTitle: "创建志愿者服务器",
		createServerDesc: "在这里，您可以设置和管理您的志愿计算项目。配置服务器设置，定义任务，并监控项目进度。",
		connectServerTitle: "连接到服务器",
		connectServerDesc: "加入现有的志愿计算项目。输入服务器详细信息，选择要贡献的项目，并开始共享您的计算机资源。",
	},
	"pt": {
		createServer: "Criar Servidor",
		connectServer: "Conectar ao Servidor",
		createServerTitle: "Criar Servidor Voluntário",
		createServerDesc:
			"Aqui você pode configurar e gerenciar seu projeto de computação voluntária. Configure as definições do servidor, defina tarefas e monitore o progresso do projeto.",
		connectServerTitle: "Conectar ao Servidor",
		connectServerDesc:
			"Junte-se a projetos de computação voluntária existentes. Insira detalhes do servidor, escolha projetos para contribuir e comece a compartilhar os recursos do seu computador.",
	},
	"pt-br": {
		createServer: "Criar Servidor",
		connectServer: "Conectar ao Servidor",
		createServerTitle: "Criar Servidor Voluntário",
		createServerDesc:
			"Aqui você pode configurar e gerenciar seu projeto de computação voluntária. Configure as configurações do servidor, defina tarefas e monitore o progresso do projeto.",
		connectServerTitle: "Conectar ao Servidor",
		connectServerDesc:
			"Participe de projetos de computação voluntária existentes. Insira detalhes do servidor, escolha projetos para contribuir e comece a compartilhar os recursos do seu computador.",
	},
	"es": {
		createServer: "Crear Servidor",
		connectServer: "Conectar al Servidor",
		createServerTitle: "Crear Servidor Voluntario",
		createServerDesc:
			"Aquí puede configurar y administrar su proyecto de computación voluntaria. Configure los ajustes del servidor, defina tareas y supervise el progreso del proyecto.",
		connectServerTitle: "Conectar al Servidor",
		connectServerDesc:
			"Únase a proyectos de computación voluntaria existentes. Ingrese los detalles del servidor, elija proyectos para contribuir y comience a compartir los recursos de su computadora.",
	},
	"ja": {
		createServer: "サーバーを作成",
		connectServer: "サーバーに接続",
		createServerTitle: "ボランティアサーバーを作成",
		createServerDesc:
			"ここでは、ボランティアコンピューティングプロジェクトを設定および管理できます。サーバー設定を構成し、タスクを定義し、プロジェクトの進捗を監視します。",
		connectServerTitle: "サーバーに接続",
		connectServerDesc:
			"既存のボランティアコンピューティングプロジェクトに参加します。サーバーの詳細を入力し、貢献するプロジェクトを選択し、コンピューターのリソースの共有を開始します。",
	},
}

function setLanguage(lang) {
	document.querySelectorAll("[data-lang-key]").forEach((elem) => {
		const key = elem.getAttribute("data-lang-key")
		elem.textContent = translations[lang][key]
	})
	document.documentElement.lang = lang
}

document.querySelectorAll(".nav-tabs a").forEach((tab) => {
	tab.addEventListener("click", (e) => {
		e.preventDefault()
		document.querySelectorAll(".nav-tabs a").forEach((t) => t.classList.remove("active"))
		tab.classList.add("active")
		document.querySelectorAll(".tab-content").forEach((content) => content.classList.remove("active"))
		document.querySelector(tab.getAttribute("href")).classList.add("active")
	})
})

const languageSelectBtn = document.getElementById("language-select-btn")
const languageDropdown = document.getElementById("language-dropdown")
const currentLanguage = document.getElementById("current-language")
const currentFlag = document.getElementById("current-flag")

languageSelectBtn.addEventListener("click", () => {
	languageDropdown.classList.toggle("hidden")
})

document.querySelectorAll("#language-dropdown li").forEach((item) => {
	item.addEventListener("click", (e) => {
		const lang = e.target.getAttribute("data-lang")
		const flag = e.target.getAttribute("data-flag")
		setLanguage(lang)
		currentLanguage.textContent = e.target.textContent
		currentFlag.className = `flag-icon flag-icon-${flag}`
		languageDropdown.classList.add("hidden")
	})
})

// Set initial language
setLanguage("en")
currentLanguage.textContent = "English"
currentFlag.className = "flag-icon flag-icon-us"

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
	if (!languageSelectBtn.contains(e.target) && !languageDropdown.contains(e.target)) {
		languageDropdown.classList.add("hidden")
	}
})

