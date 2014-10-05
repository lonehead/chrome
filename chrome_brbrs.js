// ==UserScript==
// Script - chrome v14.10.2

// Запуск сприпта - цифрой 1 (не Numlock) или кнопкой
// Проверить наличие ошибки - цифрой 2 (не Numlock)
// Очистит данные (sessionStorage и localStorage) скрипта - цифрой 3 (не Numlock)

// Меня найти можно тут - http://ofcourse.spaces.ru/files/?Dir=3808387&Link_id=343439&Link_id=341515&LT=1
// Инструкция (а я стрался ее вам написать) скрипта тут - http://varx.ru/viewtopic.php?pid=13531#p13531
// Github - https://github.com/lonehead/chrome

var ss = sessionStorage; 
var ls = localStorage;

if (!ss.setngs.match(ss.nick) || ss.nick == undefined)
{
	var autologin = 0; // НЕ ТРОГАТЬ
	var password  = ""; // НЕ ТРОГАТЬ

//////////////// НАСТРОЙКА ПЕРСОНАЖА /////////////////////////

	//// НАСТРОЙКИ С ПРЕМИУМОМ
	if (ss.prem == 1) {
	var set_altar  = 2; // 0 - не брать; 1 - за железо; 2 - за золото; 3 - алтарь+5замков; 4 - алтарь+все замки; 5 - все бафы
	var tower_flee = 0; // 0 - смена локи, 1 - убегать на главную (при крит ХП)

	// подарок,медитация,секрет,рефлекс,ярость,лед,жажда,адрен,опустошение,критон,дыхание,гнев,стойкость

	var drop_svitok_n = [ 0,0,0,0,0,0,0,0,0,0,0,0,0 ]; // какие новые свитки бот будет выбрасывать . 6 - миф, 5 - лег
	var drop_svitok_l = [ 0,0,0,0,0,0,0,0,0,0,0,0,0 ]; // какие личные свитки бот будет выбрасывать . 6 - миф, 5 - лег

	var actv_svitok_n = [ 0,0,0,0,0,0,0,0,0,0,0,0,0 ]; // какие новые свитки бот будет включать . 6 - миф, 5 - лег
	var actv_svitok_l = [ 0,0,0,0,0,0,0,0,0,0,0,0,0 ]; // какие личные свитки бот будет включать. 6 - миф, 5 - лег
	}
	//// НАСТРОЙКИ БЕЗ ПРЕМИУМА
	if (ss.prem != 1) {
	var set_altar  = 0; // 0 - не брать; 1 - за железо; 2 - за золото; 3 - алтарь+5замков; 4 - алтарь+все замки; 5 - все бафы
	var tower_flee = 0; // 0 - смена локи, 1 - убегать на главную (при крит ХП)

	// подарок,медитация,секрет,рефлекс,ярость,лед,жажда,адрен,опустошение,критон,дыхание,гнев,стойкость

	var drop_svitok_n = [ 0,0,0,0,0,0,0,0,0,0,0,0,0 ]; // какие новые свитки бот будет выбрасывать при разборе вещей. 6 - ми0, 5 - лег
	var drop_svitok_l = [ 0,0,0,0,0,0,0,0,0,0,0,0,0 ]; // какие личные свитки бот будет выбрасывать при разборе вещей. 6 - миф, 5 - лег

	var actv_svitok_n = [ 0,0,0,0,0,0,0,0,0,0,0,0,0 ]; // какие новые свитки бот будет включать. 6 - миф, 5 - лег
	var actv_svitok_l = [ 0,0,0,0,0,0,0,0,0,0,0,0,0 ]; // какие личные свитки бот будет включать. 6 - миф, 5 - лег
	}
	//// Остальные настройки

	// Еслив настройках без премиума set_altar = 0 и нет премиума
	var no_prem_alt = [ 1,1,1,1,1,1,1,1,1,1,1,1,1,1 ]; // // 0 - не брать; 1 - за железо; 2 - за золото;
	// Башни, Арена, Замки, Турнир 1x1, Турнир 3x3, Выживание, Территории
	// Битва героев, Поля сражений, Боссы, Логово, Цари Горы, Горол Древних, Дуэли

	var set_krit_bers = 1; // Умное использование берсерка и критомании на боссах (одновременно)
	var set_metal_sh  = 0; // брать железный щит на царях

	var set_energ_low = [ 0,0,0,0,0 ]; // пить бутылки, если мало енки, 1 - пить, 0 - нет | Башни, звери, арена, выживание, остальные евенты
	var set_drink_b   = [ 4,4 ]; // пить бутылки, 1 - пить всегда
	// если 2 - пить бытылки до 50-ти боев (работает на арене и выживании)
	// если 3 - пить только на обязательны боях (работает на арене и выживании)
	// если 4 - пить бытылки при 1х1 (работает на арене и выживании)
	// пить бутылки наарене, выживании

	// Башни, Арена, Замки, Турниры, Выживание, Территории
	// Битва героев, Поля сражений, Боссы, Логово, Цари Горы, Горол Древних, Дуэли

	// больше 200 - точное кол-во оставшегося здоровья для питья бутыли (коэфициент меньше чем уровень твоего хп (в одиницах) - пьет бутылку)
	// от 2 до 200 - оставшееся здоровье в % для питья бутыли (коэфициент меньше чем уровень твоего хп (в процентах) - пьет бутылку)
	// до 2 - пить бутылку по получаемому урону (коэфициент умножить на полученный урон больше твоего ХП - пьет бутылку)

	var set_drink_hp = [ 1.5, 1.5, 1.5, 30, 1.5, 1000, 1.5, 1.5, 30, 1.5, 1.5, 1.5, 1.5 ]; // коэфициент для питья банок

	var uvorot_hp   = 1; // уровень здоровья для использования уворота (% от Вашего здоровья)
	var en_shit_hp  = 1; // уровень здоровья для энергетического щита (% от Вашего здоровья)
	var kam_shit_hp = 1; // уровень здоровья для использования каменного щита (% от Вашего здоровья)
	var otr_shit_hp = 1; // уровень здоровья для использования щита отражения (% от Вашего здоровья)
	// если уровень здоровья для использования умения = 1, то умение используется только когда Вас бьют

	var cdt_attack = [3800, 5800]; // кулдаун при ударах или выжигании (min, max)
	var cdt_boos_a = [3500, 4500]; // кулдаун при ударах или выжигании (на боссах)
	var cdt_event  = [3800, 5300]; // кулдаун при ударах или выжигании (на событиях)

	var cdt_heal   = [3500, 4000]; // кулдаун при лечении
	var cdt_boos_h = [3000, 4500]; // кулдаун при лечении (на боссах)
	var cdt_def    = [1400, 2100]; // кулдаун для уроворота, кам/отрж/энерг щитов и питья бутылочёк

	var cdt_stop   = [10000, 20000]; // время обновления чата при команде стоп

	var min_battle = [0, 0] // минимальное количество боев на арене и выживаниии

	var set_escape = 1; // 1 - при побеге с выживания играть на арене и на оборот, 0 - при побеге сидеть на главной
	var return_alive = 1; // если нет усталости то лока кача..
	var return_tired = 0; // если не снимать усталость и она появилась, то лока кача..

	// 0 - На главной
	// 1 - Башни
	// 2 - Выживание
	// 3 - Арена
	// 4 - "Выжывание-Арена"

	var massa_max  = 2000; // максимальное количество народа в локе для перехода
	var enemy_min  = 10; // минимальное количество врагов для перехода в следующую локу

	var krit_massa = 2; // отношение количества вражеских войнов к количеству союзников для бегства c локации
	var krit_hp    = 60; // критический уровень жизней для осуществления "бегства" с локации, (% от вашего здоровья)
	// если стоит 0, то бегство с локации не работает

	var tmt = [300, 400]; // время обычных действий (разбор вещей, снятие усталости, переходы и т.д.)

	var set_territory = 0; // ходить на территории | 1 - да, 0 - нет
	var set_notify    = 0; // ходить на боссов по обьяве | 1 - да, 0 - нет
	var battle_ground = 0; // ходить на поля | 1 - да, 0 - нет
	var set_cari      = 0; // ходить на цари горы
	var set_bmess     = 0; // ходить на Город Древних
	var set_battle    = 0; // ходить на битву героев
	var set_logovo    = 0; // ходить в логово
	var tournament    = 0; // 0 - не ходить на турнир ; 1 - только 1х1 ; 2 - 1х1 и 2х2 ; 3 - только 2х2
	var dungeon_duel  = 0; // 0 - не дуэли и в подземку ; 1 - только в подземку ; 2 - в подземку и на дуэли ; 3 - только дуэли

	var bmess_res = 0; // воскрешаться в городе древних (за железо) 1 - да ; 0 - нет

	var set_heal_select  = 1; // 0 - только лечить, 2- только жечь, 1 - жечь энергию если некого лечить (рандомно)
	var set_attack_tower = 1; // 0 - не атаковать башни, 2 - атаковать всегда, 1 - по ситуации

	var well_udacha   = 0; // подарок колодца 0 - не брать; 1 - ежедневный подарок; 2 - подарок старателей
	var set_quests    = 0; // автоматически забирать награды за выполнение заданий | 1 - да, 0 - нет
	var set_otklonyat = 0; // отклонять приглашения в другие кланы? если не хотите отклонять | 1 - да, 0 - нет
	var set_skrivat   = 0; // автоматически скрывать гильд-нотайсы | 1 - да, 0 - нет

	var set_razbor = 1; // разбирать вещи | 1 - да, 0 - нет
	var set_chinit = 1; // чинить вещи | 1 - да, 0 - нет
	var chinit_vse = 5000; // чинить всё, если поломка больше ...

	// шлем, амулет, наплечник, накидка, броня, пояс, штаны, браслет, перчатки, кольца, оружие, сапоги
	var razb_type = new Array(); // не трогать ету строчку

	    razb_type[0] = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]; // какие эпические разбирать, 3 - все, 2 - клановые и личные, 1 - только личные
	    razb_type[1] = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]; // какие лег разбирать, 3 - все, 2 - клановые и личные, 1 - только личные
	    razb_type[2] = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]; // какие миф вещи разбирать на мифрил, 3 - новые, 2 - клановые

	var set_castles = [ 0,0,0,0,0,0,0,0 ]; // 1 - ходить на захват, 0 - нет
	var set_buffs   = [ 0,0,0,0,0,0,0,0 ]; // 1 - брать баф, 0 - нет
	// замки по порярку: голова, сердце, гроза, крепость, исцеление, зеркало, источник, колыбель

	// айди клана определяет скрипт сам, не надо его прописывать
	var set_citadel = [ 0,0,0 ]; // 1 - включать цитадели , 0 - нет .. доступно только лидеру и генералам клана!
	// цитадели по порядку: башня, статуя, академия

	//по порядку: умения, таланты, снаряжение

	var sets_ackiv = [ 0,0,0 ] // 1 - менять, 0 - нет
	// Башни, Арена, Замки, Турнир 1x1, Турнир 3x3, Выживание, Территории
	// Битва героев, Поля сражений, Боссы, Логово, Цари Горы, Горол Древних, Дуэли

	var abil_num = [ 1,1,1,1,1,1,1,1,1,1,1,1,1,1 ]; // какие наборы умений использовать
	var stan_num = [ 1,1,1,1,1,1,1,1,1,1,1,1,1,1 ]; // какие наборы талантов использовать
	var body_num = [ 1,1,1,1,1,1,1,1,1,1,1,1,1,1 ]; // какие комплекты снаряжения использовать

	var troll_ev = 0;  // медам на троле: 0 - лечить, 1 - жгу, 2 - лечу и жгу
	var nemka_ev = 0;  // воинам на немке бить: 0 - ХП+ , 1 - Бить Гарма , 2 - Бить Церба, 3 - Бить Нему, 4 - Гарм-Ц+Н
	var zod_ev   = 0;  // воинам на зоде бить: 0 - обычный режим , 1 - бить знаков не больше 4-х букв
	var leg_ev   = 0;  // воинам на легионе бить: 0 - Ант.М+Л , 1 - Только Легата

	var hp_yap  = 25; // оставить % хп Япитеру
	var hp_garm = 0; // оставить % хп Гарму
	var hp_cerb = 15; // оставить % хп Церберу
	var hp_nema = 0; // оставить % хп Немке
	var nem_kam = 300; // включать кам щит на немезиде, когда обшая сумма ХП зверей ниже ...
	var tr_shit = 15; // если броня тролля выше, то жгу | Режим "Лечу и Жгу" у меда

	var small_boss = [ 0,0,0,0 ]; // 1 - ходить, 0 - нет (гарпии, мантикора, минотавр, лег)

	var set_chat = 0; //  1 - выполнять спец. команды, отображать чат, 0 - не выполнять спец.команды

	var chat_attack = "ВАША ЧАТ-КОМАНДА"; // спец. команда начать бой

	var chat_mif = "ВАША ЧАТ-КОМАНДА"; // спец. команда на драка
	var chat_vel = "ВАША ЧАТ-КОМАНДА"; // спец. команда на велов
	var chat_troll = "ВАША ЧАТ-КОМАНДА"; // спец. команда на троля
	var chat_nemka = "ВАША ЧАТ-КОМАНДА"; // спец. команда на нему
	var chat_zod = "ВАША ЧАТ-КОМАНДА"; // спец. команда на зода
	var chat_pred = "ВАША ЧАТ-КОМАНДА"; // спец. команда на святилище предков
	var chat_legn = "ВАША ЧАТ-КОМАНДА"; // спец. команда на легион
	var chat_trof = "ВАША ЧАТ-КОМАНДА"; // спец. команда на трофа
	var chat_exit = "ВАША ЧАТ-КОМАНДА"; // спец. команды на выход из пещер

	var chat_altar = "ВАША ЧАТ-КОМАНДА"; // спец. команды на взятие алтаря

	var chat_start = "ВАША ЧАТ-КОМАНДА"; // спец. команда на старт
	var chat_stop = "ВАША ЧАТ-КОМАНДА"; // спец. команда на стоп

	// Список дополнительных команд на зверей(для чата и обьяв)
	// "ник перса" + "гоу"..."миф"..."нема"..."троль","зод"..."троф"..."велы","свят"..."легион"..."выход"..."старт"..."стоп"
	// Вместо "ник перса", нужно писать оригинальный ник персонажа в игре, после ника пробел.

	// Список команд на територии(для чата и обьяв), на другие не реагирует

	var terra_clan_tag = ""; // клановый тег для команд на территориях

	// Грозовой Перевал - "терраперевал", "хрм1"		// Пещеры Мантикор - "терраманти", "хрм15"
	// Тысяча Гор - "террагоры", "хрм2"					// Золотые Пески - "террапески", "хрм16"
	// Седые Холмы - "террахолмы", "хрм3"				// Ущелье Драконов - "террадраконов", "хрм17"
	// Каменный Лес - "терралес", "хрм4"				// Самоцветные Копи - "терракопи", "хрм18"
	// Пепельная Пустыня - "террапустыня", "хрм5"		// Мрачные низины - "терранизины", "хрм19"
	// Черное Озеро - "терраозеро", "хрм6"				// Серебряные реки - "террареки", "хрм20"
	// Могильные Топи - "терратопи", "хрм7"				// Зеленые луга - "терралуга", "хрм21"
	// Голые Камни - "терракамни", "хрм8"				// Старый рудник - "террарудник", "хрм22"
	// Покинутые Степи - "террастепи", "хрм9"			// Спящий вулкан - "терравулкан", "хрм23"
	// Забытая Долина - "террадолина", "хрм10"			// Лазурные поля - "терраполя", "хрм24"
	// Черные Скалы - "терраскалы", "хрм11"				// Каньон ветров - "терраветров", "хрм25"
	// Выжженные земли - "терраземли", "хрм12"			// Светлое плато - "терраплато", "хрм26"
	// Мертвый остров - "терраостров", "хрм13"			// Полуостров скелетов - "терраскелетов", "хрм27"
	// Радужный Оазис - "терраоазис", "хрм14"			// Молодой залив - "терразалив", "хрм28"

	var unravel   = 0;  // 1 - разгадывать капчу, 0 - off на 30 мин (картинки в опере должны быть включены)
	var set_ustal = 0; // снимать усталость | 1 - да, 0 - нет
	var tire_max  = "23:59"; // не снимать усталость после "час:минуты" по серверу
	var tire_min  = "00:00"; // не снимать усталость до "час:минуты" по серверу

	var lvl_shmot   = 0; // уровень шмоток, которые бот будет одевать | 6 - миф и ниже, 5 - лег и ниже...
	var lvl_openbox = 0; // уровень открываевых ящиков | 6 - миф и ниже, 5 - лег и ниже...
	var lvl_drop_st = 0; // уровень выбрасываемых камней в хранилище (если нет клана - просто выбрасывает) | 6 - миф и ниже, 5 - лег и ниже...

	var set_white  = 0; // Как использовать БС | 1 - не добиваем в башнях, 2 - не добиваем в событиях, 3 - не добиваем в башнях и в событиях, 0 - отключен ЧС

	var white_list = "";

	var set_black  = 0; // Как использовать ЧС | 1 - добиваем в башнях, 2 - добиваем в событиях, 3 - добиваем в башнях и в событиях, 0 - отключен БС

	var black_list = "";

	// Походы на зверей. В указанный промежуток временни скрипт ведет свих играков на зверей через гильд-нотайсы.

	var mif_list = 'СПИСОК ИГРОКОВ ЧЕРЕЗ ЗАПЯТУЮ'; // список игроков на мифа
	var mif_notify = 'ЧАТ-КОМАНДА/КОМАНДА НА ВЫХОД'; // команда на мифа / команда на выход
	var set_mif = "- 00:00/00:00";	//  если +, поход включен, дальше промежуток времени в для похода чч:мм/чч:мм

	var vel_list = 'СПИСОК ИГРОКОВ ЧЕРЕЗ ЗАПЯТУЮ'; // список игроков на вела
	var vel_notify = 'ЧАТ-КОМАНДА/КОМАНДА НА ВЫХОД'; // команда на вела / команда на выход
	var set_vel = "- 00:00/00:00"; //  если +, автопоход включен, дальше промежуток времени в для похода чч:мм/чч:мм

	var troll_list = 'СПИСОК ИГРОКОВ ЧЕРЕЗ ЗАПЯТУЮ'; // список персов на троля
	var troll_notify = 'ЧАТ-КОМАНДА/КОМАНДА НА ВЫХОД'; // команда на троля / команда на выход
	var set_troll = "- 00:00/00:00"; //  если +, поход включен, дальше промежуток времени в для похода чч:мм/чч:мм

	var nemka_list = 'СПИСОК ИГРОКОВ ЧЕРЕЗ ЗАПЯТУЮ'; // список персов на немку
	var nemka_notify = 'ЧАТ-КОМАНДА/КОМАНДА НА ВЫХОД'; // команда на нему / команда на выход
	var set_nemka = "- 00:00/00:00"; //  если +, поход включен, дальше промежуток времени в для похода чч:мм/чч:мм

	var zod_list = 'СПИСОК ИГРОКОВ ЧЕРЕЗ ЗАПЯТУЮ'; // список персов на зода
	var zod_notify = 'ЧАТ-КОМАНДА/КОМАНДА НА ВЫХОД'; // команда на зода / команда на выход
	var set_zod = "- 00:00/00:00"; //  если +, поход включен, дальше промежуток времени в для похода чч:мм/чч:мм

	var pred_list = 'СПИСОК ИГРОКОВ ЧЕРЕЗ ЗАПЯТУЮ'; // список персов на свята
	var pred_notify = 'ЧАТ-КОМАНДА/КОМАНДА НА ВЫХОД'; // команда на свята / команда на выход
	var set_pred = "- 00:00/00:00"; //  если +, поход включен, дальше промежуток времени в для похода чч:мм/чч:мм

	var legn_list = 'СПИСОК ИГРОКОВ ЧЕРЕЗ ЗАПЯТУЮ'; // список персов на легиона
	var legn_notify = 'ЧАТ-КОМАНДА/КОМАНДА НА ВЫХОД'; // команда на легиона / команда на выход
	var set_legn = "- 00:00/00:00"; //  если +, поход включен, дальше промежуток времени в для похода чч:мм/чч:мм
}
//////////////// НАСТРОЙКА ЗАКОНЧЕНА /////////////////////////

if (document.addEventListener)
{	
	try
	{
		var spt = r_num(400, 550);
		var obnovlenie = r_num(3000, 7000);

		cdt_attack = r_num(cdt_attack[0], cdt_attack[1]); 
		cdt_boos_a = r_num(cdt_boos_a[0], cdt_boos_a[1]); 
		cdt_event = r_num(cdt_event[0], cdt_event[1]); 
		cdt_heal = r_num(cdt_heal[0], cdt_heal[1]); 
		cdt_boos_h = r_num(cdt_boos_h[0], cdt_boos_h[1]); 
		cdt_def = r_num(cdt_def[0], cdt_def[1]); 
		cdt_stop = r_num(cdt_stop[0], cdt_stop[1]); 
		tmt = r_num(tmt[0], tmt[1]);

		var user_id = '';
		var lvl = '';
		var u_class = '';
		var storona = 1;
		var strong = '';
		var life = '';
		var t1 = 0, t2 = 0;
		var tmt_id = '';
		var info = '', info_button = '';
		var guild_id = '';
		var return_loc = '';

		var good_target = 0;
		var target = 0;
		var notarget = 0;
		var nekogo_lechit = 0;
		var dmg_text = 0;

		var in_events = 0;
		var in_towers = 0;
		var err_d = 0;
		var moderate = 0;
		var good_alt = 0;
		var terr_blue = 0;
		var terr_green = 0;

		var activ_berserk = 0;
		var activ_energshit = 0;
		var activ_shitotr = 0;
		var activ_kamshit = 0;
		var activ_kritomania = 0;
		var activ_pronik = 0;
		var activ_smeshka = 0;
		var activ_uvorot = 0;

		var krit_hp = '';
		var berserk = '', t_bers = '';
		var kritomania = '', t_krit = '';
		var pronikaushii = '', t_pron = '';
		var nasmeshka = '', t_nasm = '';
		var metka = '', t_met = '';
		var resurection = '', time_res = '';
		var buttle = '', t_but = '';
		var uvorot = '', t_uvo = '';
		var kamshit = '', t_kam = '';
		var shitotr = '', t_otr = '';
		var energshit = '', t_ener = '';

		var attack = '';
		var attack_vrag = '';
		var attack_towers = '', hp_bashni = '';
		var attack_dobivat = '', hp_vraga = '', damage = '';
		var heal = '', heal_end = 1;
		var heal_target = '';
		var heal_your_self = '';
		var heal_soyznika = '';
		var destroy_mana = '';
		var destroy_mana_boss = '';
		var attack_vrata = '';
		var attack_strazh = '';
		var attack_czar = '';
		var metal_shit = '';
		var dnd = '';
		var boss = 0;
		var attack_gerod = '';
		var attack_kochev = '', dobivat_kochev = '', hp_kocev = '';
		var nemezida = '', hp_n = '';
		var garm = '', hp_g = '';
		var cerber = '', hp_c = '';
		var attack_aello = '', attack_ozonenu = '';
		var manticora = '';
		var minotavr = '';
		var trofei = '';
		var attack_drakon = '';
		var attack_troll = '';
		var attack_bers = '';
		var boss_start = '';
		var epiter = '', hp_ep = '';
		var yapiter = '', hp_ya = '';
		var zodiak = '', hp_zod = '';
		var attack_soul = '', zod_soul = '';
		var attack_legat = '', attack_mark = '', attack_antoniy = '', attack_legion = '', lgn_shit = '';
		var peshera = [];

		var drink_hp = 0;
		var otklonit = '', skrit = '';
		var obnovit = '', ready = '';
		var vstat_v_ochered = '', pokinut_ochered = '', noviu_boy = '';
		var vbitvu = '', vernutsa = '';
		var vhod = '';
		var na_glavnuy = '';
		var vzamok = '';
		var terr_n = [];
		var bg = '';
		var turnir = '', turnir1x1 = '', turnir2x2 = '';
		var next_tower = 0;
		var castle = [];
		var greats = '', bashni = '', arena = '', castles = '', cargori = '', survival = '', battle = '', logovo = '', bmess = '';
		var territory = '', na_terr = '';
		var duel = '', dung_game = '';
		var journey = '', statistics = '';
		var vhodvigru = '';
		var time_serv = '';
		var comp_time = '', temp_date = '', day = '', minutes = '', seconds = '';
		var server_time = ['', '', '', ''];

		var abil_link = ['', '', '', '', '', ''];
		var stan_link = ['', '', '', '', '', ''];
		var item_link = ['', '', '', '', '', ''];
		var klan = '', klan_moderate = '', altar = '', zaiti_altar = '', altarserebro = '', altarjelezo = '', altarcastles = '', altar_all_castles = '', altarwell = '';
		var use_full = '';
		var ustalost = '', snyat_ustalost = '';
		var quest = '', take = '';
		var prof_podarok = '', podarok = '', well = '';
		var captcha = '', captcha_img = '', cap_src = '';
		var get_buff = '';
		var get_cita = '';
		var bag = '', body = '', abilities = '';
		var veshi = '', select = '';
		var v_rukzak = '', v_sunduk = '', nadet = '', vikinut = '', to_storage = '';
		var mifril = '';
		var add_stone = '';
		var confirm_link = '';
		var poluchit = '';
		var open = '';
		var openbag = '';
		var openstore = '';
		var nochar = '';
		var tray_status = '';
		var activ_link = '';
		var pochinit = '', pochinit_vse = '', pochinit_za = '', pochinit_vse_za = '';
		var razobrat_vse = '', razobrat = '';
		var user = '';
		var vboy = '';
		var bag_better = 0;
		var clothes_broken = 0;
		var lowenergy = 0;
		var fullstore = 0;
		var full_bag = 0;
		var destroy_man = '';
		var vrag, drug, vrag_mech, vrag_med, drug_mech, drug_med, vrag_koch;
		var uroven_hp = '', uroven_en = '';
		var massa = '';
		var action = 0;
		var real_dmg = '';
		var all_damage = 0;
		var target_name = '';

		var next_page = '';
		var svitki_link = '';
		var kamni_link = '';

		var z_bg = '', c_bg = '', v_bg = '', o_bg = '', y_bg = '', s_bg = '';
		var ksu = '', mss = '', trenirovka = '', kurgan = '', lager_ordi = '', lager_vikingov = '';
		var uste_reki = '', lednik = '', praviu_bereg = '', verhniu_pereval = '', leviy_bereg = '', ledyanie_pesheri = '', delta_reki = '', nijniu_pereval = '', kamennie_pesheri = '', gornoe_ozero = '';
		var perekrestok = '', u_pustosh = '', uz_pustosh = '', z_pustosh = '', sz_pustosh = '', uv_pustosh = '', v_pustosh = '', sv_pustosh = '', s_pustosh = '';
		var b_kurgan = '', v_rosengard = '', z_rosengard = '', z_marokand = '', v_marokand = '', rudnik = '', m_kipi = '', marokand = '', rosengard = '';
		var mgs = '', mgu = '', uzo = '', ho = '', hz = '', uvo = '', pz = '', pv = '', pr = '', szo = '', hn = '', hv = '', svo = '';
		var zts = '', szg = '', svg = '', zv = '', kt = '', vv = '', uzg = '', uvg = '', ztu = '';
		var dss = '', szf = '', svf = '', zk = '', pvb = '', vk = '', uzf = '', uvf = '', dsu = '';

		var rus = ["а", "А", "с", "С", "е", "Е", "Т", "Н", "о", "О", "р", "Р", "х", "Х", "В", "М", "у"];
		var eng = ["a", "A", "c", "C", "e", "E", "T", "H", "o", "O", "p", "P", "x", "X", "B", "M", "y"];

		var nick = '';
		if (ss.nick != undefined) nick = r_txt(ss.nick);
		var div = document.getElementsByTagName('div');
		var a = document.getElementsByTagName('a');
		var span = document.getElementsByTagName('span');
		var title = '';
		if (document.getElementsByTagName('title')[0] != undefined) title = r_txt(document.getElementsByTagName('title')[0].textContent);
		var img = document.getElementsByTagName('img');
		var any_tag = document.getElementsByTagName('*');

		var body_t = document.body.textContent;
		var rus_t = r_txt(document.body.textContent);
		var f_time = /(\d+):(\d+):(\d+)/;

		var item_name = [];

		item_name.push('Шлем|Амулет|Медальон|Наплечник|Накидка|Бурка|Плащ|Кираса|Кольчуга|Пояс|Штаны|Поножи|Браслет|Наручи|Перчатки|Рукавицы|Кольцо|Перстень|Посох|Молот|Копье|Топор|Секира|Сапоги');
		item_name.push('Подарок алхимика|Медитация|Секрет победы|Рефлекс тигра|Ярость смертника|Ледяной щит|Жажда познания|Адреналин|Опустошение|Сила критона|Уверенное дыхание|Нарастающий гнев|Стойкость|Стратегический ум');
		item_name.push('Изумруд|Обсидиан|Сапфир|Корунд|Оникс|Руна|Запертый ящик|Книга');

		var type_crack = new Array();

	//	var epic_crack = [];
	//	var leg_crack = [];
	//	var mif_crack = [];

		var terra_writ = [];

		terra_writ[1] = "хрм1$|терраперевал"; if (terra_clan_tag != '') terra_writ[1] = "хрм1$|терраперевал|" + terra_clan_tag + "перевал";
		terra_writ[2] = "хрм2$|террагоры"; if (terra_clan_tag != '') terra_writ[2] = "хрм2$|террагоры|" + terra_clan_tag + "горы";
		terra_writ[3] = "хрм3$|террахолмы"; if (terra_clan_tag != '') terra_writ[3] = "хрм3$|террахолмы|" + terra_clan_tag + "холмы";
		terra_writ[4] = "хрм4$|терралес"; if (terra_clan_tag != '') terra_writ[4] = "хрм4$|терралес|" + terra_clan_tag + "лес";
		terra_writ[5] = "хрм5$|террапустыня"; if (terra_clan_tag != '') terra_writ[5] = "хрм5$|террапустыня|" + terra_clan_tag + "пустыня";
		terra_writ[6] = "хрм6$|терраозеро"; if (terra_clan_tag != '') terra_writ[6] = "хрм6$|терраозеро|" + terra_clan_tag + "озеро";
		terra_writ[7] = "хрм7$|терратопи"; if (terra_clan_tag != '') terra_writ[7] = "хрм7$|терратопи|" + terra_clan_tag + "топи";
		terra_writ[8] = "хрм8$|терракамни"; if (terra_clan_tag != '') terra_writ[8] = "хрм8$|терракамни|" + terra_clan_tag + "камни";
		terra_writ[9] = "хрм9$|террастепи"; if (terra_clan_tag != '') terra_writ[9] = "хрм9$|террастепи|" + terra_clan_tag + "степи";
		terra_writ[10] = "хрм10$|террадолина"; if (terra_clan_tag != '') terra_writ[10] = "хрм10$|террадолина|" + terra_clan_tag + "долина";
		terra_writ[11] = "хрм11$|терраскалы"; if (terra_clan_tag != '') terra_writ[11] = "хрм11$|терраскалы|" + terra_clan_tag + "скалы";
		terra_writ[12] = "хрм12$|терраземли"; if (terra_clan_tag != '') terra_writ[12] = "хрм12$|терраземли|" + terra_clan_tag + "земли";
		terra_writ[13] = "хрм13$|терраостров"; if (terra_clan_tag != '') terra_writ[13] = "хрм13$|терраостров|" + terra_clan_tag + "остров";
		terra_writ[14] = "хрм14$|терраоазис"; if (terra_clan_tag != '') terra_writ[14] = "хрм14$|терраоазис|" + terra_clan_tag + "оазис";
		terra_writ[15] = "хрм15$|терраманти"; if (terra_clan_tag != '') terra_writ[15] = "хрм15$|терраманти|" + terra_clan_tag + "манти";
		terra_writ[16] = "хрм16$|террапески"; if (terra_clan_tag != '') terra_writ[16] = "хрм16$|террапески|" + terra_clan_tag + "пески";
		terra_writ[17] = "хрм17$|террадраконов"; if (terra_clan_tag != '') terra_writ[17] = "хрм17$|террадраконов|" + terra_clan_tag + "драконов";
		terra_writ[18] = "хрм18$|терракопи"; if (terra_clan_tag != '') terra_writ[18] = "хрм18$|терракопи|" + terra_clan_tag + "копи";
		terra_writ[19] = "хрм19$|терранизины"; if (terra_clan_tag != '') terra_writ[19] = "хрм19$|терранизины|" + terra_clan_tag + "низины";
		terra_writ[20] = "хрм20$|террареки"; if (terra_clan_tag != '') terra_writ[20] = "хрм20$|террареки|" + terra_clan_tag + "реки";
		terra_writ[21] = "хрм21$|терралуга"; if (terra_clan_tag != '') terra_writ[21] = "хрм21$|терралуга|" + terra_clan_tag + "луга";
		terra_writ[22] = "хрм22$|террарудник"; if (terra_clan_tag != '') terra_writ[22] = "хрм22$|террарудник|" + terra_clan_tag + "рудник";
		terra_writ[23] = "хрм23$|терравулкан"; if (terra_clan_tag != '') terra_writ[23] = "хрм23$|терравулкан|" + terra_clan_tag + "вулкан";
		terra_writ[24] = "хрм24$|терраполя"; if (terra_clan_tag != '') terra_writ[24] = "хрм24$|терраполя|" + terra_clan_tag + "поля";
		terra_writ[25] = "хрм25$|терраветров"; if (terra_clan_tag != '') terra_writ[25] = "хрм25$|терраветров|" + terra_clan_tag + "ветров";
		terra_writ[26] = "хрм26$|терраплато"; if (terra_clan_tag != '') terra_writ[26] = "хрм26$|терраплато|" + terra_clan_tag + "плато";
		terra_writ[27] = "хрм27$|терраскелетов"; if (terra_clan_tag != '') terra_writ[27] = "хрм27$|терраскелетов|" + terra_clan_tag + "скелетов";
		terra_writ[28] = "хрм28$|терразалив"; if (terra_clan_tag != '') terra_writ[28] = "хрм28$|терразалив|" + terra_clan_tag + "залив";

		var name_scrl = ["Подарок алхимика", "Медитация", "Секрет победы", "Рефлекс тигра", "Ярость смертника", "Ледяной щит", "Жажда познания", "Адреналин", "Опустошение", "Сила критона", "Уверенное дыхание", "Нарастающий гнев", "Стойкость", "Стратегический ум"];
		var castle_name = ["Голова дракона", "Сердце титана", "Гроза миров", "Крепость духа", "Исцеление предков", "Зеркало боли", "Источник познания", "Колыбель жизни"];
		var dung_name = ["Пещерный стражник", "Грот Гарпий", "Пещера мантикоры", "Лабиринт минотавра", "Легендарный дракон", "Мифический дракон", "Храм Немезиды", "Каменный тролль", "Обитель Зодиака", "Трофейный дракон", "Долина великанов", "Святилище предков", "Потерянный Легион"];
		var dung_loc = ["guardian", "harpy", "manticora", "minotaur", "irondragon", "dragonDungeon", "nemezida", "stoneTroll", "zodiac", "dragonTrophy", "giantvalley", "greatBoss", "legion"];
		var some_name = ["Башня мудрости", "Статуя критона", "Академия клана"];
		var terra_name = ["Грозовой Перевал", "Тысяча Гор", "Седые Холмы", "Каменный Лес", "Пепельная Пустыня", "Черное Озеро", "Могильные Топи", "Голые Камни", "Покинутые Степи", "Забытая Долина", "Черные Скалы", "Выжженные земли", "Мертвый остров", "Радужный Оазис", "Пещеры Мантикор", "Золотые Пески", "Ущелье Драконов", "Самоцветные Копи", "Мрачные низины", "Серебряные реки", "Зеленые луга", "Старый рудник", "Спящий вулкан", "Лазурные поля", "Каньон ветров", "Светлое плато", "Полуостров скелетов", "Молодой залив" ];

		if (ss.arena_games == undefined || new_day) ss.arena_games = 0;
		if (ss.surv_games == undefined || new_day) ss.surv_games = 0;
		

		if (ss.svitok == undefined) ss.svitok = "0";
		if (ss.bonus == undefined) ss.bonus = "0";
		if (ss.cita == undefined) ss.cita = "0";
		if (ss.dungeon == undefined) ss.dungeon = "0";
		if (ss.mark == undefined) ss.mark = "";
		if (ss.plar == undefined) ss.plar = '';
		if (ss.rtngs == undefined) ss.rtngs = '';
		if (ss.udacha == undefined) ss.udacha = 0;
		if (ss.kills == undefined) ss.kills = '';
		if (ss.change_set == undefined) ss.change_set = '';

		var svitok = ss.svitok.split(",");
		var bonus = ss.bonus.split(",");
		var cita = ss.cita.split(",");
		var dungeon = ss.dungeon.split(",");
		var mark = ss.mark.split(",");
		var plar = ss.plar.split(",");
		var rtngs = ss.rtngs.split(",");

		var reg = /(\d+) ур, (медик|воин), (юг|север) (\d+) (\d+)/;
		if (reg.test(ss.user) && ss.user != undefined)
		{
			var str = reg.exec(ss.user);
			lvl = str[1];
			u_class = str[2];
			if (str[3] == "север") storona = 0;
			strong = str[4];
			life = str[5];
		}
		temp_date = new Date();
		day = temp_date.getDate();
		hours = temp_date.getHours();
		minutes = temp_date.getMinutes();
		seconds = temp_date.getSeconds();
		comp_time = hours * 3600 + minutes * 60 + seconds;

		var new_day = 0;
		if (mark[1] != day && mark[1] != undefined) new_day = 1;
		mark[1] = day;

		for (var i = 0; i <= 13; i++)
		{
			if (svitok[i] == undefined) svitok[i] = 0;
			if (/\d+/.test(svitok[i]))
			{
				var t = /\d+/.exec(svitok[i]);
				if (new_day) t = t - 86400;
				if (t <= comp_time) svitok[i] = 0;
				else if (/нет/.test(svitok[i])) svitok[i] = t + " нет";
				else svitok[i] = t;
			}
		}
		ss.svitok = svitok;

		for (var i = 0; i <= 9; i++)
		{
			if (bonus[i] == undefined) bonus[i] = 0;
			if (new_day) bonus[i] = bonus[i] - 86400;
			if (bonus[i] <= comp_time) bonus[i] = 0;
		}
		ss.bonus = bonus;

		for (var i = 0; i <= 2; i++)
		{
			if (cita[i] == undefined) cita[i] = 0;
			if (new_day) cita[i] = cita[i] - 86400;
			if (cita[i] <= comp_time) cita[i] = 0;
		}
		ss.cita = cita;

		for (var i = 2; i <= 27; i++)
		{
			if (mark[i] == undefined) mark[i] = 0;
			if (mark[i] == undefined) mark[i] = 0;
			if (i >= 10 && i <= 18)
			{
				if (new_day) mark[i] = mark[i] - 86400;
				if (mark[i] <= comp_time) mark[i] = 0;
			}
		}
		ss.mark = mark;

		for (var i = 0; i <= 14; i++)
		{
			if (dungeon[i] == undefined) dungeon[i] = 0;
			if (/\d+/.test(dungeon[i]))
			{
				var t = /\d+/.exec(dungeon[i]);
				if (new_day) t = t - 86400;
				if (t <= comp_time) dungeon[i] = 0;
				else if (/неуд\./.test(dungeon[i])) dungeon[i] = t + " неуд.";
				else dungeon[i] = t;
			}
		}
		ss.dungeon = dungeon;

		document.onkeydown = function(event)
		{
			if (event.keyCode == 51) {ls.clear(); ss.clear(); location.href = location.href;}
			if (event.keyCode == 50 && ss.errors != undefined) alert(ss.errors);
			else  if (event.keyCode == 50) alert("Ошибок нет, всё нормально.");

			if (event.keyCode == 49 && ls.on_off == "on")
			{
				ls.on_off = "off";
				on_off.style = "text-decoration:none; color:gray";
				if (tmt_id != "") clearTimeout(tmt_id);
				if (typeof activ_link == "object") activ_link.style.color = "";
				if (ss.nick != undefined) on_off.textContent = ss.nick; else on_off.textContent = "Вкл.Js";
			}
			else if (event.keyCode == 49 && ls.on_off != "on")
			{
				ls.on_off = "on";
				on_off.style = "text-decoration:none; color:orange";
				ss.perehod = 1;
				if (ss.nick != undefined) on_off.textContent = ss.nick; else on_off.textContent = "Выкл.Js";
				location.href = location.href;
			}
			return 1;
		}

		if (/barbars|варвары|46.4.4.56|br.spaces|odnoklassniki/.test(location.host))
		{
			fill_var();
			fill_data();
			test_location();
		}
		if (ls.on_off == "on" && /barbars|варвары|46.4.4.56|br.spaces|odnoklassniki/.test(location.host))
		{
			if (title.match(/500|502 Bad Gateway|Еrrоr/i) || !/ \d+ \d+/.test(rus_t) && !/Онлайн|Вход|Срок/.test(rus_t)) //если есть ошибка, или не загрузилась страничка (нет хп и енергии героя)
			{
				setInterval(function() {location.reload()}, 2000);
				action = true;
			}
			if (rus_t.match(/404 - /)) {setInterval(function() {location.href = '/user';}, 2000); console.error('Ошибка. Страница "' + location.href + '" не найдена.');}

			if ((title.match(/защита от ботов!/) || /user\/check/.test(location.href)) && cap_src != '' && unravel)
			{
				click(location.href, r_num(60000, 120000));

				function listener(event)
				{
					if (event.origin !== "http://antigate.com") return;
					obrabotka_otveta(event.data);
				}
				if (window.addEventListener) window.addEventListener("message", listener, 0);
				else window.attachEvent("onmessage", listener);

				var iframe = document.createElement('iframe');
				iframe.src = "http://antigate.com/in.php";
				iframe.style.display = 'none';
				document.body.appendChild(iframe);

				iframe.onload = function()
				{
					var canvas = document.createElement('canvas');
					canvas.width = "200";
					canvas.height = "50";
					var context = canvas.getContext('2d');
					var image = new Image();
					image.src = cap_src;
					image.onload = function()
					{
						context.drawImage(image, 0, 0);
						var data = (canvas.toDataURL('image/png')).replace("data:image/png;base64,", "");
						window.iframe.contentWindow.postMessage(data, "http://antigate.com");
					}
				}
			}
			if ((title.match(/защита от ботов!/) || /user\/check/.test(location.href)) && cap_src != '' && !unravel) click(location.href, 30 * 60000);

			if (!action) auctione();
			if (!action) auto_login();
			if (!action && !title.match("Чат клана") && set_territory && klan != '') get_territory();
			if (!action && !title.match("Чат клана") && set_notify && klan != '' && ss.territory==undefined) boss_notify();
			if (!action) bugs();
			if (!action) select_arena();
			if (!action) select_survival();
			if (!action) proverka_loga();
			if (!action) to_boss();
			if (!action && ss.user.match(/lg/)) boss_raid();
			if (!action && well_udacha != 0 && lvl > 20) udacha_();
			if (!action && !title.match("Чат клана")) user_check();
			if (!action && !title.match("Чат клана") && klan != '') to_altar();
			if (!action) svitok_time();
			if (!action && sets_ackiv[0] == 1) select_abil();
			if (!action && sets_ackiv[1] == 1) select_stan();
			if (!action && sets_ackiv[2] == 1) select_body();
			if (!action) change_set();
			if (!action && ss.prem != 1 && set_altar == 0) no_prem_altar();
			if (!action && lvl > 19 && !title.match("Чат клана") && ss.territory==undefined) get_castles();
			if (!action && !title.match("Чат клана") && mark[15] != 1 && mark[10] != 1) castle_buff();
			if (!action && !title.match("Чат клана")) some_();
			if (!action && mark[26] != 0 && full_bag && mark[7] == 1) stone_drop();
			if (!action && !title.match("Чат клана")) razobrat_veshi();
			if (!action && !title.match("Чат клана") && (mark[26] > 0 && mark[7] == 1 || mark[26] >= 5 && mark[7] == 0) && klan != '') stone_drop();
			if (!action && !title.match("Чат клана") && set_chinit) repair();
			if (!action && !title.match("Чат клана")) get_battle();
			if (!action) user_return();
			if (!action) {if (boss) dnd_event(); else select_event();}
			other_return();
		}
		add_info();

		ss.mark = mark;
		ss.setngs = '';
	} catch (err)
	{
		setInterval(function() {location.href = "/user"}, r_num(1000, 3000));
		ss.errors = err; console.log("Ошибка скрипт: " + err);
	}
}
function r_txt(data)
{
	var rus = ["а", "А", "с", "С", "е", "Е", "Т", "Н", "о", "О", "р", "Р", "х", "Х", "В", "М", "у"];
	var eng = ["a", "A", "c", "C", "e", "E", "T", "H", "o", "O", "p", "P", "x", "X", "B", "M", "y"];

	var str = data;

	for (var i = 0; i <= rus.length; i++) str = str.split(eng[i]).join(rus[i]);

	str = str.replace(/(\n(\r)?)/g, ' ');
	str = str.split(/&nbsp;/).join(" ");
	str = str.replace(/&nbsp;/g, ' ');
	str = str.replace(/(\s) {1,}/g, ' ');
	return str;
}
function click(link, timer, perehod)
{
	if (link != '' && !action)
	{
		action = 1; activ_link = link;
		tray_status = timer; t1 = +new Date();

		if (perehod == 1) ss.perehod = 1;
		else if (perehod == 0) ss.perehod = 0;

		if (typeof arguments.callee.caller == "function")
		{
			if (typeof link == "object") console.info(r_txt(server_time[2] + ':' + server_time[3] + ' [' + in_towers + '-' + in_events + '-' + boss + '] ' + ' [' + arguments.callee.caller.toString().match(/function ([^(]*)\(/)[1] + '] ' + title + ' -- ' + activ_link.textContent));
			else if (typeof link != "object") console.info(r_txt(server_time[2] + ':' + server_time[3] + ' [' + in_towers + '-' + in_events + '-' + boss + '] ' + ' [' + arguments.callee.caller.toString().match(/function ([^(]*)\(/)[1] + '] ' + title + ' -- ' + link));
		}
		if (link != undefined && typeof link == "object") activ_link.style.color = "orange";
	//	tmt_id = setTimeout(function() {location.href = link;}, timer);
		tmt_id = setTimeout(function() {location.href = link; setInterval(function() {location.href = link;}, 4 * timer);}, timer);
		return;
	}
}
function fill_data()
{
	if (title.match("Алтарь клана"))
	{
		var reg1 = /Твой бонус: \+(\d+)(\.)?(\d+)?% \[(\d+):(\d+):(\d+)/i;
		if (reg1.test(rus_t))
		{
			bonus[8] = get_sec(f_time.exec(reg1.exec(rus_t))) + comp_time;
		}
	}
	if (title.match("Мой герой") && altar != '')
	{
		var lvl_alt = /алтарь \+((\d+)(\.)?(\d+))?%/i;
		if (lvl_alt.test(rus_t)) ss.lvl_alt = Number((lvl_alt.exec(rus_t))[1]);

		var reg = /алтарь \+(\d+)(\.)?(\d+)?% \[(\d+):(\d+):(\d+)/i;
		if (rus_t.match("алтарь не активен")) bonus[8] = 0;
		else if (reg.test(rus_t))
		{
			at = f_time.exec(reg.exec(rus_t));
			bonus[8] = get_sec(at) + comp_time;
		}
	}
	if (title.match('Бонус замка'))
	{
		for (var i = 0; i <= 7; i++)
		{
			var reg = new RegExp(castle_name[i] + " \\[(\\d+):(\\d+):(\\d+)", "i");
			if (reg.test(rus_t))
			{
				bonus[i] = get_sec(reg.exec(rus_t)) + comp_time;
			}
		}
	}
	ss.bonus = bonus;

	var dead_boss = [];

	dead_boss.push('Пещерный стражник убит'); dead_boss.push('Гарпии убиты'); dead_boss.push('Мантикора убита');
	dead_boss.push('Минотавр убит'); dead_boss.push('Легендарный дракон убит');
	dead_boss.push('Дракон мертв'); dead_boss.push('Немезида и ее верные псы мертвы');
	dead_boss.push('Каменный тролль мертв'); dead_boss.push('Зодиак убит');
	dead_boss.push('Дракон мертв'); dead_boss.push('Великаны мертвы');
	dead_boss.push('Вход в Святилище предков закрыт'); dead_boss.push('Легион убит');

	for (var i = 0; i <= 12; i++)
	{
		if (title.match(/Пуст(ой|ая)|Кладбище/) && rus_t.match(dead_boss[i]) && location.href.match(dung_loc[i]))
		{
			var reg = new RegExp(dead_boss[i] + ", воскреснет через (\\d+):(\\d+):(\\d+)", "i");
			if (reg.test(rus_t))
			{
				dungeon[i] = get_sec(reg.exec(rus_t)) + comp_time;
				if (ss.to_boss == i) ss.removeItem("to_boss");
			}
		}
		if (title.match(/Пуст(ой|ая)|Кладбище|Вход закрыт/) && location.href.match(dung_loc[i]))
		{
			var reg = new RegExp("Вход закрыт. Откроется через (\\d+):(\\d+):(\\d+)", "i");
			if (reg.test(rus_t) && rus_t.match(/Откроется/))
			{
				dungeon[i] = get_sec(reg.exec(rus_t)) + comp_time + ' неуд.';
				if (ss.to_boss == i) ss.removeItem("to_boss");
			}
			else if (/Бой начался,/) dungeon[i] = 300 + comp_time + ' неуд.';
		}
	}
	if (title.match(/Варвары/) && rus_t.match(/(лья|ли) откроются через/))
	{
		var podz_h = new RegExp("Подземелья откроются через (\\d+)ч. (\\d+)мин.", "i");
		var podz_hm = new RegExp("Подземелья откроются через (\\d+)мин.", "i");
		if (podz_h.test(rus_t)) dungeon[13] = podz_h.exec(rus_t)[1]*3600 + podz_h.exec(rus_t)[2]*60 + (comp_time + 60);
		if (podz_hm.test(rus_t)) dungeon[13] = podz_hm.exec(rus_t)[1]*60 + (comp_time + 60);

		var dl_reg_h = new RegExp("Дуэли откроются через (\\d+)ч. (\\d+)мин.", "i");
		var dl_reg_hm = new RegExp("Дуэли откроются через (\\d+)мин.", "i");
		if (dl_reg_h.test(rus_t)) dungeon[14] = dl_reg_h.exec(rus_t)[1]*3600 + dl_reg_h.exec(rus_t)[2]*60 + (comp_time + 60);
		if (dl_reg_hm.test(rus_t)) dungeon[14] = dl_reg_hm.exec(rus_t)[1]*60 + (comp_time + 60);	
	}
	
	if (title.match(/Варвары/) && dung_game == '') dungeon[13] = 23 * 3600 + 60 * 60 + 60;
	else if (title.match(/Варвары/) && !rus_t.match(/лья откроются через/)) dungeon[13] = 0;
	if (title.match(/Варвары/) && !rus_t.match(/ли откроются через/)) dungeon[14] = 0;
	ss.dungeon = dungeon;

	if (title.match(/Башня мудрости|Статуя критона|Академия клана/i))
	{
		var time = 200;
		var reg = /Бонус клана: \+(\d+)(\.)?(\d+)?% (клан. опыта|крит|личного опыта) \[(\d+):(\d+):(\d+)]/i;
		if (reg.test(rus_t))
		{
			time = get_sec(f_time.exec(reg.exec(rus_t)));
			for (var i = 0; i <= 2; i++)
			{
				if (title.match(some_name[i])) cita[i] = time + comp_time;
			}
		}
	}
	ss.cita = cita;

	if (title.match('Мои умения'))
	{
		var r_tm = r_num(30, 120);
		for (var i = 0; i <= 13; i++)
		{
			var reg = new RegExp(name_scrl[i] + " \\[(\\d+):(\\d+):(\\d+)", "i");
			if (reg.test(rus_t))
			{
				svitok[i] = get_sec(reg.exec(rus_t)) + comp_time + r_tm;
			}
		}
		ss.svitok = svitok;

		ss.abilities = '';
		for (var i = 5; i > 0; i--)
		{
			if (rus_t.match("Выбрать набор " + i)) {ss.abilities = i + " "; break;}
			else ss.abilities = "0 ";
		}
		for (var i = 1; i <= 5; i++) if (abil_link[i] == undefined && rus_t.match('Выбрать набор ' + i)) ss.abilities += i + ',';
	}
	if (title.match('Таланты'))
	{
		ss.stances = '';
		for (var i = 5; i > 0; i--)
		{
			if (rus_t.match("Выучить набор " + i)) {ss.stances = i + " "; break;}
			else ss.stances = "0 ";
		}
		for (var i = 1; i <= 5; i++) if (stan_link[i] == undefined && rus_t.match('Выучить набор ' + i)) ss.stances += i + ',';
	}
	if (title.match("Моё снаряжение"))
	{
		ss.body = '';
		for (var i = 5; i > 0; i--)
		{
			if (rus_t.match("Надеть комплект " + i)) {ss.body = i + " "; break;}
			else ss.body = "0 ";
		}
		for (var i = 1; i <= 5; i++) if (item_link[i] == undefined && rus_t.match('Надеть комплект ' + i)) ss.body += i + ',';
	}
}
function fill_var()
{
	for (var y = 0; y < any_tag.length; y++)
	{
		if (/&nbsp;/.test(any_tag[y].innerHTML)) any_tag[y].innerHTML = any_tag[y].innerHTML.replace(/&nbsp;/g, ' ');

		if (any_tag[y].style.display == 'none')
		{
			for (var i = 0; i < any_tag.length; i++) if (any_tag[y].contains(any_tag[i]))
			{
				any_tag[i].textContent = '';
				any_tag[i].href = '';
				any_tag[i].src = '';
			}

			any_tag[y].textContent = '';
			any_tag[y].href = '';
			any_tag[y].src = '';
		}
		if (any_tag[y].tagName == "A" && any_tag[y].textContent == '' && any_tag[y].href == '' || /div|span/i.test(any_tag[y].tagName) && any_tag[y].textContent == '' && any_tag[y].href == '' && any_tag[y].src == '' && any_tag[y].getElementsByTagName('input')[0] == undefined || any_tag[y].tagName == "IMG" && any_tag[y].src == '') any_tag[y].parentNode.removeChild(any_tag[y]);

		if (any_tag[y - 7] != undefined) if (any_tag[y - 7].tagName == 'IMG' && any_tag[y - 6].tagName == 'SPAN' && any_tag[y - 5].tagName == 'IMG' && any_tag[y - 4].tagName == 'SPAN' && any_tag[y - 3].tagName == 'IMG' && any_tag[y - 2].tagName == 'SPAN' && any_tag[y - 1].tagName == 'IMG' && any_tag[y].tagName == 'SPAN')
		{
			if (!isNaN(Number(any_tag[y + 2].textContent)) && any_tag[y + 1].tagName == 'IMG' && any_tag[y + 2].tagName == 'SPAN') vrag_koch = Number(any_tag[y + 2].textContent);

			if (!isNaN(Number(any_tag[y].textContent)) && !isNaN(Number(any_tag[y - 2].textContent)) && !isNaN(Number(any_tag[y - 4].textContent)) && !isNaN(Number(any_tag[y - 6].textContent)))
			{
				if (!storona)
				{
					drug_mech = Number(any_tag[y - 6].textContent);
					drug_med = Number(any_tag[y - 4].textContent);
					vrag_mech = Number(any_tag[y - 2].textContent);
					vrag_med = Number(any_tag[y].textContent);
				}
				else
				{
					vrag_mech = Number(any_tag[y - 6].textContent);
					vrag_med = Number(any_tag[y - 4].textContent);
					drug_mech = Number(any_tag[y - 2].textContent);
					drug_med = Number(any_tag[y].textContent);
				}
				drug = drug_mech + drug_med;
				vrag = vrag_mech + vrag_med;

				if (vrag_koch > 0) vrag = vrag + vrag_koch * 2;	massa = vrag + drug;
			}
		}
	}

	if (kam_shit_hp != 1) krit_hp = life * krit_hp / 100;
	if (uvorot_hp != 1) uvorot_hp = life * uvorot_hp / 100;
	if (kam_shit_hp != 1) kam_shit_hp = life * kam_shit_hp / 100;
	if (otr_shit_hp != 1) otr_shit_hp = life * otr_shit_hp / 100;
	if (en_shit_hp != 1) en_shit_hp = life * en_shit_hp / 100;

	if (/ \d+/.test(rus_t)) uroven_hp = / (\d+)/.exec(rus_t)[1];
	if (uroven_hp < 0) uroven_hp = life;

	if (/ \d+ (\d+)/.test(rus_t)) uroven_en = / \d+ (\d+)/.exec(rus_t)[1];
	if (uroven_en < 0) uroven_en = 0;

	var sm = document.getElementsByClassName("small minor");
	if (sm[0] != undefined) if (f_time.test(sm[sm.length - 1].textContent))
	{
		server_time = f_time.exec(sm[sm.length - 1].textContent);
		time_serv = get_sec(server_time);
	}

	if (title.match("Мой герой"))
	{
		ss.user = '';
		var reg = /(\d+) ур, (медик|воин), (юг|север)/i;
		if (reg.test(rus_t))
		{
			ss.user = (reg.exec(rus_t))[0];

			ss.user += " " + (/сила: (\d+)/.exec(rus_t))[1];
			ss.user += " " + (/здоровье: (\d+)/.exec(rus_t))[1];

			var my_username = /\n (.+)\n(\d+) ур, (медик|воин), (юг|север)/i;
			if (my_username.test(body_t)) ss.nick = (my_username.exec(body_t))[1];

			var guildname= /\n(.+), (лидер|генерал|офицер|ветеран|рядовой|рекрут)/;
			if (guildname.test(body_t)) ss.guild = (guildname.exec(body_t))[1];

			var t_max = /(\d+):(\d+)/.exec(tire_max);
			var utt_max = t_max[1] * 3600 + t_max[2] * 60;
			var t_min = /(\d+):(\d+)/.exec(tire_min);
			var utt_min = t_min[1] * 3600 + t_min[2] * 60;

			if (/, (лидер|генерал)/i.test(rus_t)) ss.user += " lg\.";
			else if (/, (лидер|генерал|офицер)/i.test(rus_t)) ss.user += " lgo\.";
			if (/Премиум \+(\d+)%/i.test(rus_t)) ss.prem = 1;
			else ss.removeItem('prem');

			if (/усталость: -(\d+)%/i.test(rus_t) && set_ustal && utt_max <= time_serv && utt_min >= time_serv) ss.ustal = 1;
			else if (/усталость: -(\d+)%/i.test(rus_t) && !set_ustal) ss.ustal = 1;
			else ss.removeItem('ustal');
		}
	}

	user_id = get_cookie("id");

	function link_array()
	{
		var atext = r_txt(a[i].text);
		if (/guild/.test(a[i].href)) if (/guild\/\d+/.test(a[i].href)) guild_id = /guild(\/\d+)/.exec(a[i].href)[1];
		if (user_id != '' && nick == '') nick = atext;
		if (/user\/id/.test(a[i].href)) if (/Вернуться в бой/.test(atext)) vboy = a[i];
		if (!/user\/id/.test(a[i].href))
		{
			if (/Вход в игру/.test(atext)) vhodvigru = a[i];
			if (/Мой клан/.test(atext)) klan = a[i];
			if (/Управление кланом/.test(atext)) klan_moderate = a[i];
			if (/Вход/.test(atext)) vhod = a[i];
			if (/user\/check/.test(a[i].href)) captcha = a[i];
			if (/sacrifaceMoneyLink/.test(a[i].href)) altarserebro = a[i];
			if (/sacrifaceIronLink/.test(a[i].href)) altarjelezo = a[i];
			if (/sacrifaceMoneyCastle1Link/.test(a[i].href)) altarcastle = a[i];
			if (/sacrifaceMoneyCastle2Link/.test(a[i].href)) altar_all_castle = a[i];
			if (/alterCastlesAndWellPageLink/.test(a[i].href)) altarwell = a[i];
			if (/user\/rack/.test(a[i].href)) bag = a[i];
			if (/user\/body/.test(a[i].href) ) body = a[i];
			if (/toStoreLink/.test(a[i].href)) v_sunduk = a[i];
			if (/paginator\:next/.test(a[i].href)) next_page = a[i];
			if (/scrollFilterLink/.test(a[i].href)) svitki_link = a[i];
			if (/stoneFilterLink/.test(a[i].href)) kamni_link = a[i];
			if (/getProffesionGiftLink/.test(a[i].href)) prof_podarok = a[i];
			if (/getDailyGiftLink/.test(a[i].href)) podarok = a[i];
			if (/усталость/.test(atext)) ustalost = a[i];
			if (/Снять усталость за/.test(atext)) snyat_ustalost = a[i];
			if (/user\/quests$/.test(a[i].href)) quest = a[i];
			if (/Забрать награду/.test(atext)) take = a[i];
			if (/Умения/.test(atext)) abilities = a[i];
			if (/Открыть рюкзак/.test(atext)) openbag = a[i];
			if (/Открыть сундук/i.test(atext)) openstore = a[i];
			if (/в рюкзак/.test(atext)) v_rukzak = a[i];
			if (/алтарь/.test(atext)/* && klan != ''*/) altar = a[i];
			if (/Колодец удачи/.test(atext)) well = a[i];
			if (/Получить бонус/.test(atext)) get_buff = a[i];
			if (/Активировать/.test(atext)) get_cita = a[i];

			if (/Починить все вещи за (\d+)/.test(atext)) {pochinit_vse = a[i]; pochinit_vse_za = /\d+/.exec(atext);}
			if (/починить за (\d+)/.test(atext)) {pochinit = a[i]; pochinit_za = /\d+/.exec(atext);}

			if (/надеть/.test(atext)) nadet = a[i];
			if (/sellMifrilLink/.test(a[i].href)) mifril = a[i];
			if (/Разобрать все на железо/.test(atext)) razobrat_vse = a[i];
			if (/разобрать на/i.test(atext)) razobrat = a[i];

			if (/Вещи/.test(atext)) veshi = a[i];
			if (/Поставить чары на вещи/.test(atext)) nochar = a[i];
			if (/выбрать/.test(atext)) select = a[i];
			if (/подтверждаю/i.test(atext)) confirm_link = a[i];
			if (/открыть/.test(atext)) open = a[i];
			if (/получить/.test(atext)) poluchit = a[i];
			if (/выкинуть/.test(atext)) vikinut = a[i];
			if (/в хранилище/.test(atext)) add_storage = a[i];
			if (/Добавить камни/.test(atext)) add_stone = a[i];

			if (/startCombatLink/.test(a[i].href)) boss_start = a[i];
			if (/Бить/.test(atext)) attack = a[i];
			if (/Бить Геррода|Жечь энергию Герроду/.test(atext)) attack_gerod = a[i];
			if (/Бить Кочевников/.test(atext)) attack_kochev = a[i];
			if (/Бить Кочевника/.test(atext)) {dobivat_kochev = a[i]; hp_kocev = /\d+/.exec(atext);}
			if (/Бить врата/.test(atext)) attack_vrata = a[i];
			if (/Бить Стражника/.test(atext)) attack_strazh = a[i];
			if (/Бить царей/.test(atext)) attack_czar = a[i];
			if (/Бить врагов/.test(atext)) attack_vrag = a[i];
			if (/Бить башню/.test(atext)) {attack_towers = a[i]; hp_bashni = /\d+/.exec(atext);}
			if (/Добивать/.test(atext)) {attack_dobivat = a[i]; hp_vraga = /\d+/.exec(atext);}
			if (/Лечить союзников/.test(atext)) heal = a[i];
			if (/Лечить цель/.test(atext)) heal_target = a[i];
			if (/Лечить /.test(atext) && /% хп/.test(atext)) {heal_soyznika = a[i]; HP = /\d+/.exec(atext); if (HP >= r_num(175, 200) && boss == 0) heal_end = 0; if (HP <= r_num(0, 120) && boss) heal_end = 1;}
			if (/Лечить себя/.test(atext)) heal_your_self = a[i];
			if (/Жечь энергию врагам/.test(atext)) destroy_mana = a[i];
			if (/Жечь энергию у/.test(atext)) {destroy_man = a[i]; if (/\d+/.exec(atext) == 0) good_target = 2;}
			if (/Жечь /.test(atext)) destroy_mana_boss = a[i];
			if (/железный щит за (\d+)/.test(atext)) metal_shit = a[i];

			if (/Берсерк \(((\d+)сек|готово)/.test(atext)) {t_bers = /\d+/.exec(atext) * 1000; if (!a[i].className.match('buff')) berserk = a[i];}
			if (/Энергетический щит \(((\d+)сек|готово)/.test(atext)) {t_ener = /\d+/.exec(atext) * 1000; if (!a[i].className.match('buff')) energshit = a[i];}
			if (/Щит отражения \(((\d+)сек|готово)/.test(atext)) {t_otr = /\d+/.exec(atext) * 1000; if (!a[i].className.match('buff')) shitotr = a[i];}
			if (/Каменный щит \(((\d+)сек|готово)/.test(atext)) {t_kam = /\d+/.exec(atext) * 1000; if (!a[i].className.match('buff')) kamshit = a[i];}
			if (/Критомания \(((\d+)сек|готово)/.test(atext)) {t_krit = /\d+/.exec(atext) * 1000; if (!a[i].className.match('buff')) kritomania = a[i];}
			if (/Проникающий удар \(((\d+)сек|готово)/.test(atext)) {t_pron = /\d+/.exec(atext) * 1000; if (!a[i].className.match('buff')) pronikaushii = a[i];}
			if (/Насмешка \(((\d+)сек|готово)/.test(atext)) {t_nasm = /\d+/.exec(atext) * 1000; if (!a[i].className.match('buff')) nasmeshka = a[i];}
			if (/Метка охотника \(((\d+)сек|готово)/.test(atext)) {t_met = /\d+/.exec(atext) * 1000; if (!a[i].className.match('buff')) metka = a[i];}
			if (/Уворот \(((\d+)сек|готово)/.test(atext)) {t_uvo = /\d+/.exec(atext) * 1000; if (!a[i].className.match('buff')) uvorot = a[i];}
			if (/Пить бутылочку \((\d+)шт/.test(atext))	{t_but = 0; if (!a[i].className.match('buff')) buttle = a[i];}
			if (/Пить бутылочку \((\d+)сек/.test(atext)) {t_but = /\d+/.exec(atext) * 1000; if (!a[i].className.match('buff')) buttle = a[i];}

			if (/Берсерк \((\d+)сек/.test(atext) && a[i].className.match('buff')) activ_berserk = 1;
			if (/Энергетический щит \((\d+)сек/.test(atext) && a[i].className.match('buff')) activ_energshit = 1;
			if (/Щит отражения \((\d+)сек/.test(atext) && a[i].className.match('buff')) activ_shitotr = 1;
			if (/Каменный щит \((\d+)сек/.test(atext) && a[i].className.match('buff')) activ_kamshit = 1;
			if (/Критомания \((\d+)сек/.test(atext) && a[i].className.match('buff')) activ_kritomania = 1;
			if (/Проникающий удар \((\d+)сек/.test(atext) && a[i].className.match('buff')) activ_pronik = 1;
			if (/Насмешка \((\d+)сек/.test(atext) && a[i].className.match('buff')) {activ_smeshka = 1; good_target = 2; ss.missed = 0;}
			if (/Метка охотника \((\d+)сек/.test(atext) && a[i].className.match('buff')) activ_metka = 1;
			if (/Уворот \((\d+)сек/.test(atext) && a[i].className.match('buff')) activ_uvorot = 1;

			if (/Битва героев/.test(atext)) battle = a[i];
			if (/Турниры/.test(atext)) turnir = a[i];
			if (/Турнир героев|1х1/.test(atext)) turnir1x1 = a[i];
			if (/Командный турнир|3х3/.test(atext)) turnir2x2 = a[i];
			if (/Арена/.test(atext)) arena = a[i];
			if (/Выживание/.test(atext)) survival = a[i];
			if (/Цари горы/.test(atext)) cargori = a[i];
			if (/Поля сражений/.test(atext)) bg = a[i];
			if (/Город Древних/.test(atext)) bmess = a[i];
			if (/Логово Геррода/.test(atext)) logovo = a[i];
			if (/Великие битвы/.test(atext)) greats = a[i];
			if (/Войти в замок/.test(atext)) vzamok = a[i];
			if (/OgreDungeonPage$/.test(a[i].href)) dung_game = a[i];
			if (/DuelPage$/.test(a[i].href)) duel = a[i];

			if (/Вернуться в бой/.test(atext)) vboy = a[i];
			if (/Покинуть очередь/.test(atext)) pokinut_ochered = a[i];
			if (/Новый бой/i.test(atext)) noviu_boy = a[i];
			if (/Встать в очередь/.test(atext)) vstat_v_ochered = a[i];
			if (/отклонить/i.test(atext)) otklonit = a[i];
			if (/скрыть/.test(atext)) skrit = a[i];
			if (/Вступить в битву/.test(atext)) vbitvu = a[i];
			if (/Вернуться/.test(atext)) vernutsa = a[i];

			if (/Голова дракона/.test(atext)) castle[0] = i;
			if (/Сердце титана/.test(atext)) castle[1] = i;
			if (/Гроза миров/.test(atext)) castle[2] = i;
			if (/Крепость духа/.test(atext)) castle[3] = i;
			if (/Исцеление предков/.test(atext)) castle[4] = i;
			if (/Зеркало боли/.test(atext)) castle[5] = i;
			if (/Источник познания/.test(atext)) castle[6] = i;
			if (/Колыбель жизни/.test(atext)) castle[7] = i;
			// Территории
			if (/Территории/.test(atext)) territory = a[i];
			if (/Войти на территорию/.test(atext)) na_terr = a[i];

			// Поля Сражений 12х12
			if (/Западные Врата/.test(atext)) z_bg = a[i];
			if (/Центральные Врата/.test(atext)) c_bg = a[i];
			if (/Восточные Врата/.test(atext)) v_bg = a[i];
			if (/Обелиск Силы/.test(atext)) o_bg = a[i];
			if (/Южный Порт/.test(atext)) y_bg = a[i];
			if (/Северная Крепость/.test(atext)) s_bg = a[i];
			// Башни
			if (/Курган/.test(atext)) kurgan = a[i];
			if (/Лагерь орды/.test(atext)) lager_ordi = a[i];
			if (/Лагерь викингов/.test(atext)) lager_vikingov = a[i];

			if (/Устье реки/.test(atext)) uste_reki = a[i];
			if (/Правый берег/.test(atext)) praviu_bereg = a[i];
			if (/Левый берег/.test(atext)) leviy_bereg = a[i];
			if (/Дельта реки/.test(atext)) delta_reki = a[i];
			if (/Ледник/.test(atext)) lednik = a[i];
			if (/Верхний перевал/.test(atext)) verhniu_pereval = a[i];
			if (/Ледяные пещеры/.test(atext)) ledyanie_pesheri = a[i];
			if (/Нижний перевал/.test(atext)) nijniu_pereval = a[i];
			if (/Каменные пещеры/.test(atext)) kamennie_pesheri = a[i];
			if (/Горное озеро/.test(atext)) gornoe_ozero = a[i];

			if (/Перекрёсток/.test(atext)) perekrestok = a[i];
			if (/Южная пустошь/.test(atext)) u_pustosh = a[i];
			if (/Юго-западная пустошь/.test(atext)) uz_pustosh = a[i];
			if (/Западная пустошь/.test(atext)) z_pustosh = a[i];
			if (/Северо-западная пустошь/.test(atext)) sz_pustosh = a[i];
			if (/Юго-восточная пустошь/.test(atext)) uv_pustosh = a[i];
			if (/Восточная пустошь/.test(atext)) v_pustosh = a[i];
			if (/Северо-восточная пустошь/.test(atext)) sv_pustosh = a[i];
			if (/Северная пустошь/.test(atext)) s_pustosh = a[i];
			if (/Большой курган/.test(atext)) b_kurgan = a[i];
			if (/Восточный Розенгард/.test(atext)) v_rosengard = a[i];
			if (/Западный Розенгард/.test(atext)) z_rosengard = a[i];
			if (/Западный Мароканд/.test(atext)) z_marokand = a[i];
			if (/Восточный Мароканд/.test(atext)) v_marokand = a[i];
			if (/Железный рудник/.test(atext)) rudnik = a[i];
			if (/Медные копи/.test(atext)) m_kipi = a[i];
			if (/Мароканд/.test(atext)) marokand = a[i];
			if (/Розенгард/.test(atext)) rosengard = a[i];

			if (/Мертвый город, Юг/.test(atext)) mgu = a[i];
			if (/Юго-восточная окраина/.test(atext)) uvo = a[i];
			if (/Храм земли/.test(atext)) hz = a[i];
			if (/Храм огня/.test(atext)) ho = a[i];
			if (/Юго-западная окраина/.test(atext)) uzo = a[i];
			if (/Площадь восстания/.test(atext)) pv = a[i];
			if (/Площадь рассвета/.test(atext)) pr = a[i];
			if (/Площадь заката/.test(atext)) pz = a[i];
			if (/Северо-восточная окраина/.test(atext)) svo = a[i];
			if (/Храм воды/.test(atext)) hv = a[i];
			if (/Храм неба/.test(atext)) hn = a[i];
			if (/Северо-западная окраина/.test(atext)) szo = a[i];
			if (/Мертвый город, Север/.test(atext)) mgs = a[i];

			if (/Земли титанов, Север/.test(atext)) zts = a[i];
			if (/Северо-западные горы/.test(atext)) szg = a[i];
			if (/Северо-восточные горы/.test(atext)) svg = a[i];
			if (/Западные врата/.test(atext)) zv = a[i];
			if (/Крепость титанов/.test(atext)) kt = a[i];
			if (/Восточные врата/.test(atext)) vv = a[i];
			if (/Юго-западные горы/.test(atext)) uzg = a[i];
			if (/Юго-восточные горы/.test(atext)) uvg = a[i];
			if (/Земли титанов, Юг/.test(atext)) ztu = a[i];

			if (/Долина Сражений, Север/.test(atext)) dss = a[i];
			if (/Северо западный Форт/.test(atext)) szf = a[i];
			if (/Северо восточный Форт/.test(atext)) svf = a[i];
			if (/Западный Курган/.test(atext)) zk = a[i];
			if (/Поле вечной битвы/.test(atext)) pvb = a[i];
			if (/Восточный Курган/.test(atext)) vk = a[i];
			if (/Юго западный Форт/.test(atext)) uzf = a[i];
			if (/Юго восточный Форт/.test(atext)) uvf = a[i];
			if (/Долина Сражений, Юг/.test(atext)) dsu = a[i];

			if (/Каракорум, столица Юга/.test(atext)) ksu = a[i];
			if (/Мидгард, столица Севера/.test(atext)) mss = a[i];
			// БОССЫ
			if (/Пещеры и драконы/.test(atext)) dnd = a[i];
			if (/Пещерный стражник/.test(atext)) peshera[0] = i;
			if (/Грот Гарпий/.test(atext)) peshera[1] = i;
			if (/Пещера мантикоры/.test(atext)) peshera[2] = i;
			if (/Лабиринт минотавра/.test(atext)) peshera[3] = i;
			if (/Легендарный дракон/.test(atext)) peshera[4] = i;
			if (/Мифический дракон/.test(atext)) peshera[5] = i;
			if (/Храм Немезиды/.test(atext)) peshera[6] = i;
			if (/Каменный тролль/.test(atext)) peshera[7] = i;
			if (/Обитель Зодиака/.test(atext)) peshera[8] = i;
			if (/Трофейный дракон/.test(atext)) peshera[9] = i;
			if (/Долина великанов/.test(atext)) peshera[10] = i;
			if (/Святилище предков/.test(atext)) peshera[11] = i;
			if (/Потерянный Легион/.test(atext)) peshera[12] = i;

			if (/Бить стражника/.test(atext)) attack_strazh = a[i];
			if (/Бить Аэлло/.test(atext)) attack_aello = a[i];
			if (/Бить Озомену/.test(atext)) attack_ozonenu = a[i];
			if (/Бить мантикору/.test(atext)) manticora = a[i];
			if (/Бить минотавра/.test(atext)) minotavr = a[i];
			if (/Бить дракона/.test(atext)) attack_drakon = a[i];
			if (/Бить тролля/.test(atext)) attack_troll = a[i];
			if (/Бить (Берсерка|Голиафа|Атланта)/.test(atext)) attack_bers = a[i];

			if (/Бить Эпитера/.test(atext)) {epiter = a[i]; hp_ep = /\d+/.exec(atext)}
			if (/Бить Япитера/.test(atext)) {yapiter = a[i]; hp_ya = /\d+/.exec(atext)}
			if (/Бить Немезиду/.test(atext)) {nemezida = a[i]; hp_n = /\d+/.exec(atext)}
			if (/Бить Гарма/.test(atext)) {garm = a[i]; hp_g = /\d+/.exec(atext)}
			if (/Бить Цербера/.test(atext)) {cerber = a[i]; hp_c = /\d+/.exec(atext)}
			if (/Бить Зодиака/i.test(atext)) {zodiak = a[i]; hp_zod = /\d+/.exec(atext)}

			if (/Бить душу/.test(atext)) attack_soul = a[i];
			if (/Добивать (...|....) /.test(atext)) zod_soul = a[i];
			if (/Бить Легата/.test(atext)) attack_legat = a[i];
			if (/Бить Антония/.test(atext)) attack_antoniy = a[i];
			if (/Бить Марк/.test(atext)) attack_mark = a[i];
			if (/Бить легионера/.test(atext)) attack_legion = a[i];

			if (/scrollUse/.test(a[i].href)) use_full = a[i];

			if (/Выбрать набор 1/.test(atext)) abil_link[1] = a[i];
			if (/Выбрать набор 2/.test(atext)) abil_link[2] = a[i];
			if (/Выбрать набор 3/.test(atext)) abil_link[3] = a[i];
			if (/Выбрать набор 4/.test(atext)) abil_link[4] = a[i];
			if (/Выбрать набор 5/.test(atext)) abil_link[5] = a[i];

			if (/Выучить набор 1/.test(atext)) stan_link[1] = a[i];
			if (/Выучить набор 2/.test(atext)) stan_link[2] = a[i];
			if (/Выучить набор 3/.test(atext)) stan_link[3] = a[i];
			if (/Выучить набор 4/.test(atext)) stan_link[4] = a[i];
			if (/Выучить набор 5/.test(atext)) stan_link[5] = a[i];

			if (/Надеть комплект 1/.test(atext)) item_link[1] = a[i];
			if (/Надеть комплект 2/.test(atext)) item_link[2] = a[i];
			if (/Надеть комплект 3/.test(atext)) item_link[3] = a[i];
			if (/Надеть комплект 4/.test(atext)) item_link[4] = a[i];
			if (/Надеть комплект 5/.test(atext)) item_link[5] = a[i];

			if (/Обновить/.test(atext)) obnovit = a[i];
			if (/Я готов/.test(atext)) ready = a[i];
			if (/Назад/.test(atext)) nazad = a[i];

			if (/Воскреснуть в столице \((\d+)сек/i.test(atext)) {time_res = /\d+/.exec(atext) * 1000; resurection = a[i];}
			else if (/Воскреснуть/i.test(atext)) {time_res = tmt; resurection = a[i];}

			if (/На главную|Покинуть бой/.test(atext)) na_glavnuy = a[i];
			if (/Мой герой/.test(atext)) user = a[i];
			if (/Поход/.test(atext)) journey = a[i];
			if (/Статистика/.test(atext)) statistics = a[i];
			if (/Замки/.test(atext)) castles = a[i];
			if (/Башни/.test(atext)) bashni = a[i];
		}
	}
	for (var i = a.length - 1; i >= 0; i--) link_array();
//	for (var i = 0; i < a.length; i++) link_array();

	for (var i = 0; i < img.length; i++)
	{
		if (/captcha/.test(img[i].src)) cap_src = img[i].src;
		if (/blue_tower|blue_guard/.test(img[i].src)) if (!storona) next_tower = 1;
		if (/red_tower|red_guard/.test(img[i].src)) if (storona) next_tower = 1;
		if (/bag_full/.test(img[i].src)) full_bag = 1;
		if (/bag_better/.test(img[i].src)) bag_better = 1;
		if (/clothes_broken/.test(img[i].src)) clothes_broken = 1;
		if (/energy_low/.test(img[i].src)) lowenergy = 1;
	}
	if (ss.ustal != 1) return_loc = return_alive;
	else return_loc = return_tired;
}
function test_location()
{
	//////////////////// Башни
	if (title.match(/Каракорум, столица Юга|Мидгард, столица Севера|Курган|Лагерь викингов|Лагерь орды/)) in_towers = 1;

	if (title.match(/Дельта реки|Левый берег|Правый берег|Устье реки/)) in_towers = 1;

	if (title.match(/Ледник|Верхний перевал|Ледяные пещеры|Нижний перевал|Каменные пещеры|Горное озеро/)) in_towers = 1;

	if (title.match(/Северная пустошь|Северо-западная пустошь|Северо-восточная пустошь|Западная пустошь/)) in_towers = 1;
	if (title.match(/Перекрёсток|Восточная пустошь|Юго-западная пустошь|Юго-восточная пустошь|Южная пустошь/)) in_towers = 1;

	if (title.match(/Розенгард|Западный Розенгард|Железный рудник|Восточный Розенгард/)) in_towers = 1;
	if (title.match(/Большой курган|Западный Мароканд|Медные копи|Восточный Мароканд|Мароканд/)) in_towers = 1;

	if (title.match(/Мертвый город, Юг|Юго-восточная окраина|Храм земли|Храм огня|Храм неба|Юго-западная окраина|Площадь рассвета/)) in_towers = 1;
	if (title.match(/Площадь восстания|Площадь заката|Северо-восточная окраина|Храм воды|Северо-западная окраина|Мертвый город, Север/)) in_towers = 1;

	if (title.match(/Земли титанов, Север|Северо-западные горы|Северо-восточные горы|Западные врата/)) in_towers = 1;
	if (title.match(/Крепость титанов|Восточные врата|Юго-западные горы|Юго-восточные горы|Земли титанов, Юг/)) in_towers = 1;

	if (title.match(/Долина Сражений, Север|Северо западный Форт|Северо восточный Форт|Западный Курган/)) in_towers = 1;
	if (title.match(/Поле вечной битвы|Восточный Курган|Юго западный Форт|Юго восточный Форт|Долина Сражений, Юг/)) in_towers = 1;

	if (in_towers == 1) drink_hp = set_drink_hp[0];

	//////////////////// События
	if (title.match(/Арена/)) {in_events = 1; drink_hp = set_drink_hp[1];}
	if (title.match(/Выживание/)) {in_events = 2;drink_hp = set_drink_hp[4];}

	if (title.match(/Территория/i)) {in_events = 3; drink_hp = set_drink_hp[5];}
	if (title.match(/Логово Геррода/i)) {in_events = 4; drink_hp = set_drink_hp[9];}
	if (title.match(/Битва за подарки/i)) in_events = 5;
	if (title.match(/Цари Горы/i)) {in_events = 6; drink_hp = set_drink_hp[10];}
	if (title.match(/Битва героев/i)) {in_events = 7; drink_hp = set_drink_hp[6];}
	if (title.match(/Поля сражений/i)) {in_events = 8; drink_hp = set_drink_hp[7];}
	if (title.match(/Финал|\d\/(\d+) финала|Передышка|Турнир героев|Командный турнир|Отборочный тур/i)) {in_events = 9; drink_hp = set_drink_hp[3];}
	if (title.match(/^(Врата|Стены|Храм|Площадь|Мифриловый Зал)$|Город Древних/i)) {in_events = 10; if (bmess_res == 0) resurection = ''; drink_hp = set_drink_hp[11];}

	if (title.match(/Северная Крепость|Левые Врата севера|Правые Врата севера|Левый Склон|Правый Утес/)) in_events = 8;
	if (title.match(/Левобережный Лес|Правобережная Бухта|Левые Врата юга|Правые Врата юга/)) in_events = 8;
	if (title.match(/Южный Порт|Южная Крепость|Восточные Врата юга|Центральные Врата юга/)) in_events = 8;
	if (title.match(/Западные Врата юга|Юго-Восточный Утес|Южное Плато|Юго-Западный Склон/)) in_events = 8;
	if (title.match(/Северо-Восточный Утес|Северный Перевал|Северный Перевал|Северо-Западный Склон/i)) in_events = 8;
	if (title.match(/Восточные Врата севера|Центральные Врата севера|Западные Врата севера|Обелиск Силы/i)) in_events = 8;

	if (title.match(/Голова дракона|Сердце титана|Гроза миров|Крепость духа/i)) {in_events = 11; drink_hp = set_drink_hp[2];}
	if (title.match(/Исцеление предков|Зеркало боли|Источник познания|Колыбель жизни/i)) {in_events = 11; drink_hp = set_drink_hp[2];}

	if (title.match(/Забытый склеп|Тихая роща|Владения Медузы|Темные подвалы|Долина орков|Ущелье големов|Скалы грифонов|Башня призраков|Потерянный замок|Мрачная чаща|Дуэль/i)) in_events = 12;


	if (in_events != 0) set_attack_tower = 0;
	//////////////////// Боссы
	for (var i = 0; i <= 12; i++) if (location.href.match(dung_loc[i]))
	{
		boss = 1;
		heal_end = 0;
		setUvorot = 0;
		en_shit_hp = uroven_hp;
		break;
	}
	if (title.match(/Пещера дракона|Пещерный стражник|Грот Гарпий|Пещера мантикоры|Легендарный дракон|Лабиринт минотавра/i) || rus_t.match(/4 воина и 2 медика/))
	{
		boss = 1;
		heal_end = 0;
		setUvorot = 0;
		en_shit_hp = uroven_hp;
	}
	if (title.match(/Мифический дракон|Долина великанов|Каменный тролль|Храм Немезиды/i))
	{
		boss = 1; heal_end = 0;
		setUvorot = 0; en_shit_hp = uroven_hp;
	}
	if (title.match(/Обитель Зодиака|Святилище предков|Дракон (\d+) ур|Потерянный Легион/i))
	{
		boss = 1; heal_end = 0;
		setUvorot = 0; en_shit_hp = uroven_hp;
	}
	if (title.match(/Пустая пещера|Пустой грот|Пустая долина|Пустой храм|Пустая Обитель Зодиака/i)) err_d = 1;
	if (title.match(/Кладбище легиона/i) || title.match(/Потерянный Легион/i) && rus_t.match(/Вход закрыт/i)) err_d = 1;
	if (boss != 0) drink_hp = set_drink_hp[8];
}

function auctione()
{

	if (ss.auct_list == undefined) ss.auct_list = '';

var auct_type = new Array(); // не трогать ету строчку

    auct_type[0] = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]; // какие эпические разбирать, 3 - все, 2 - клановые и личные, 1 - только личные
    auct_type[1] = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]; // какие лег разбирать, 3 - все, 2 - клановые и личные, 1 - только личные
    auct_type[2] = [ 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]; // какие миф вещи разбирать на мифрил, 3 - новые, 2 - клановые


	for (var i = 1; i < div.length; i++) if (div[i].getElementsByTagName('a')[0] != undefined && div[i].getElementsByTagName('a')[0].href.match('/item/id/') && !action)
	{
		var item_type = 0; if (div[i].textContent.match(/, новый/)) item_type = 1;

		if (/\/item\/id\/(\d+)/.test(div[i].getElementsByTagName('a')[0].href)) var id = /\/item\/id\/(\d+)/.exec(div[i].getElementsByTagName('a')[0].href)[1];

		var type_auct = new Array();

		for (var x = 0; x < 3; x ++) type_auct[x] = ['Пусто'];
		
		for (var x = 0; x < 3; x ++)
		{
			if (auct_type[x][0] == 1) type_auct[x].push('Шлем');
			if (auct_type[x][1] == 1) type_auct[x].push('Амулет|Медальон');
			if (auct_type[x][2] == 1) type_auct[x].push('Наплечник');
			if (auct_type[x][3] == 1) type_auct[x].push('Накидка|Бурка|Плащ');
			if (auct_type[x][4] == 1) type_auct[x].push('Кираса|Кольчуга');
			if (auct_type[x][5] == 1) type_auct[x].push('Пояс');
			if (auct_type[x][6] == 1) type_auct[x].push('Штаны|Поножи');
			if (auct_type[x][7] == 1) type_auct[x].push('Браслет');
			if (auct_type[x][8] == 1) type_auct[x].push('Наручи|Перчатки|Рукавицы');
			if (auct_type[x][9] == 1) type_auct[x].push('Кольцо|Перстень');
			if (auct_type[x][10] == 1) type_auct[x].push('Посох|Молот|Копье|Топор|Секира');
			if (auct_type[x][11] == 1) type_auct[x].push('Сапоги');
		}
		var item_bonus = 7;
		var item = div[i].getElementsByTagName('a')[0];
		var item_name = r_txt(item.textContent);

	/*	var scroll = 0;*/ var epic = 0; var leg = 0; var mif = 0;

		for (var y = 0; y < div[i].getElementsByTagName('img').length; y++)
		{
			var type_img = div[i].getElementsByTagName('img')[y].src;
			if (type_img.match('bonusdarkiron')) {item_bonus = 6; break;}
			else if (type_img.match('bonuslegendary')) {item_bonus = 5; break;}
			else if (type_img.match('bonusepic')) {item_bonus = 4; break;}
			else if (type_img.match('bonusrare')) {item_bonus = 3; break;}
			else if (type_img.match('bonusgreen')) {item_bonus = 2; break;}
			else if (type_img.match('bonuscopper')) {item_bonus = 1; break;}
		}
		for (var y = 0; y < type_auct[0].length; y++) {if (item_name.match(type_auct[0][y])) {epic = 1; break;}}
		for (var y = 0; y < type_auct[1].length; y++) {if (item_name.match(type_auct[1][y])) {leg = 1; break;}}
		for (var y = 0; y < type_auct[2].length; y++) {if (item_name.match(type_auct[2][y])) {mif = 1; break;}}

		if (epic || leg || mif && id != '') ss.auct_list += id + ':' + item_name + ':' + item_bonus + ',';	

	//	if (title.match(/Рюкзак|Сундук/)) {for (var y = 0; y <= 12; y++) {if (item_name.match(name_scrl[y]) && (drop_svitok_n[y] >= item_bonus && item_type == 3 || drop_svitok_l[y] >= item_bonus && item_type != 3)) scroll = 1;}}
	}
}

function razobrat_veshi()
{
	if (!bag_better && mark[13] != 0) mark[13] = 0;

	if (in_events == 0 && boss == 0 && vboy == '')
	{
		if (mark[20] == 1) to_abil();

		if (title.match(item_name) && rus_t.match('Владелец: ' + nick))
		{
			var item_bonus = 7; var item_type = 3;

			var itemRegexp = new RegExp('(мифический|легендарный|эпический|редкий|необычный|обычный), (новый|клановый|личный) ' + title);

			if (itemRegexp.test(rus_t) && !item_info)
			{
				var item_info = (itemRegexp.exec(rus_t))[0];

				if (/мифический/.test(item_info)) item_bonus = 6;
				if (/легендарный/.test(item_info)) item_bonus = 5;
				if (/эпический/.test(item_info)) item_bonus = 4;
				if (/редкий/.test(item_info)) item_bonus = 3;
				if (/необычный/.test(item_info)) item_bonus = 2;
				if (/обычный/.test(item_info)) item_bonus = 1;

				if (/, личный/.test(item_info)) item_type = 1;
				if (/, клановый/.test(item_info)) item_type = 2;
				if (/, новый/.test(item_info)) item_type = 3;

				for (var x = 0; x < 3; x ++) type_crack[x] = ['Пусто'];

				for (var x = 0; x < 3; x ++)
				{
					if (razb_type[x][0] >= item_type) type_crack[x].push('Шлем');
					if (razb_type[x][1] >= item_type) type_crack[x].push('Амулет|Медальон');
					if (razb_type[x][2] >= item_type) type_crack[x].push('Наплечник');
					if (razb_type[x][3] >= item_type) type_crack[x].push('Накидка|Бурка|Плащ');
					if (razb_type[x][4] >= item_type) type_crack[x].push('Кираса|Кольчуга');
					if (razb_type[x][5] >= item_type) type_crack[x].push('Пояс');
					if (razb_type[x][6] >= item_type) type_crack[x].push('Штаны|Поножи');
					if (razb_type[x][7] >= item_type) type_crack[x].push('Браслет');
					if (razb_type[x][8] >= item_type) type_crack[x].push('Наручи|Перчатки|Рукавицы');
					if (razb_type[x][9] >= item_type) type_crack[x].push('Кольцо|Перстень');
					if (razb_type[x][10] >= item_type) type_crack[x].push('Посох|Молот|Копье|Топор|Секира');
					if (razb_type[x][11] >= item_type) type_crack[x].push('Сапоги');
				}
				var scroll = 0; var epic = 0; var leg = 0; var mif = 0;

				for (var y = 0; y < type_crack[0].length; y++) {if (title.match(type_crack[0][y])) {epic = 1; break;}}
				for (var y = 0; y < type_crack[1].length; y++) {if (title.match(type_crack[1][y])) {leg = 1; break;}}
				for (var y = 0; y < type_crack[2].length; y++) {if (title.match(type_crack[2][y])) {mif = 1; break;}}

				for (var y = 0; y <= 12; y++) {if (title.match(name_scrl[y]) && (drop_svitok_n[y] >= item_bonus && item_type == 3 || drop_svitok_l[y] >= item_bonus && item_type != 3)) scroll = 1;}

				if (ss.prem == 1 || mark[10] != 1) for (var y = 0; y <= 12; y++) if (title.match(name_scrl[y]) && (actv_svitok_n[y] >= item_bonus && item_type == 3 || actv_svitok_l[y] >= item_bonus && item_type != 3) && (svitok[y] == 0 || /нет/.test(svitok[y]))) if (use_full != '' && (ss.prem == 1 || mark[10] != 1))
				{
					for (var i = 0; i <= 12; i++)
					{
						if (title.match(name_scrl[i]))
						{
							svitok[i] = comp_time + 5000;
							if (use_full != '') click(use_full, tmt);
							ss.svitok = svitok;
						}
					}
				}

				if (lvl_drop_st >= item_bonus && title.match(/Изумруд|Обсидиан|Сапфир|Корунд|Оникс/i) && !klan) click(vikinut, tmt);

				else if (scroll) click(vikinut, tmt);

				else if (lvl_drop_st >= item_bonus && title.match(/Изумруд|Обсидиан|Сапфир|Корунд|Оникс/i) && add_storage != '' && klan) click(add_storage, tmt);

				else if (lvl_shmot >= item_bonus && rus_t.match(/Лучше \(\+(\d+)\)/i)) click(nadet, tmt);

				else if (item_bonus < 4 && set_razbor && !rus_t.match(/Лучше \(\+(\d+)\)/i)) click(razobrat, tmt);

				else if ((item_bonus == 4 && epic || item_bonus == 5 && leg) && set_razbor && !rus_t.match(/Лучше \(\+(\d+)\)/i)) click(razobrat, tmt);

				else if (item_bonus == 6 && mif && !rus_t.match(/Лучше \(\+(\d+)\)/i) && item_type != 1) click(mifril, tmt);

				else if (v_sunduk != '' && mark[7] != 1 && !(lvl_drop_st >= item_bonus && title.match(/Изумруд|Обсидиан|Сапфир|Корунд|Оникс/i))) click(v_sunduk, tmt);

				else click(bag, tmt);
			}
		}

		if (title.match("Подтверждение") && rus_t.match(/Он заменит текущий/i)) to_abil();
		else if (confirm_link != '' && title.match('Подтверждение')) click(confirm_link, tmt);

		if (rus_t.match(/Открыть сундук \((\d+)\/(\d+)\)/) && title.match("Рюкзак"))
		{
			var sund = /Открыть сундук \((\d+)\/(\d+)\)/.exec(rus_t);
			if (Number(sund[1]) >= Number(sund[2])) mark[7] = 1;
		}

		if (title.match("Рюкзак") && set_razbor && vikinut != '') click(vikinut, tmt);
		else if (title.match("Рюкзак") && set_razbor && mark[6] == 0 && razobrat_vse != '') {mark[6] = 1; click(razobrat_vse, tmt);}
		else if (title.match("Рюкзак") && set_razbor && razobrat != '') click(razobrat, tmt);
		else
		{
			for (var i = 1; i < div.length; i++)
			if (div[i].getElementsByTagName('a')[0] != undefined && div[i].getElementsByTagName('a')[0].href.match('/item/id/') && !action)
			{
				var item_type = 0;
				if (div[i].textContent.match(/, личный/)) item_type = 1;
				else if (div[i].textContent.match(/, клановый/)) item_type = 2;
				else if (div[i].textContent.match(/, новый/)) item_type = 3;

				for (var x = 0; x < 3; x ++) type_crack[x] = ['Пусто'];
				
				for (var x = 0; x < 3; x ++)
				{
					if (razb_type[x][0] >= item_type) type_crack[x].push('Шлем');
					if (razb_type[x][1] >= item_type) type_crack[x].push('Амулет|Медальон');
					if (razb_type[x][2] >= item_type) type_crack[x].push('Наплечник');
					if (razb_type[x][3] >= item_type) type_crack[x].push('Накидка|Бурка|Плащ');
					if (razb_type[x][4] >= item_type) type_crack[x].push('Кираса|Кольчуга');
					if (razb_type[x][5] >= item_type) type_crack[x].push('Пояс');
					if (razb_type[x][6] >= item_type) type_crack[x].push('Штаны|Поножи');
					if (razb_type[x][7] >= item_type) type_crack[x].push('Браслет');
					if (razb_type[x][8] >= item_type) type_crack[x].push('Наручи|Перчатки|Рукавицы');
					if (razb_type[x][9] >= item_type) type_crack[x].push('Кольцо|Перстень');
					if (razb_type[x][10] >= item_type) type_crack[x].push('Посох|Молот|Копье|Топор|Секира');
					if (razb_type[x][11] >= item_type) type_crack[x].push('Сапоги');
				}
				var item_bonus = 7;
				var item = div[i].getElementsByTagName('a')[0];
				var item_name = r_txt(item.textContent);

				var scroll = 0; var epic = 0; var leg = 0; var mif = 0;

				for (var y = 0; y < div[i].getElementsByTagName('img').length; y++)
				{
					var type_img = div[i].getElementsByTagName('img')[y].src;
					if (type_img.match('bonusdarkiron')) {item_bonus = 6; break;}
					else if (type_img.match('bonuslegendary')) {item_bonus = 5; break;}
					else if (type_img.match('bonusepic')) {item_bonus = 4; break;}
					else if (type_img.match('bonusrare')) {item_bonus = 3; break;}
					else if (type_img.match('bonusgreen')) {item_bonus = 2; break;}
					else if (type_img.match('bonuscopper')) {item_bonus = 1; break;}
				}
				for (var y = 0; y < type_crack[0].length; y++) {if (item_name.match(type_crack[0][y])) {epic = 1; break;}}
				for (var y = 0; y < type_crack[1].length; y++) {if (item_name.match(type_crack[1][y])) {leg = 1; break;}}
				for (var y = 0; y < type_crack[2].length; y++) {if (item_name.match(type_crack[2][y])) {mif = 1; break;}}

				if (title.match(/Рюкзак|Сундук/)) {for (var y = 0; y <= 12; y++) {if (item_name.match(name_scrl[y]) && (drop_svitok_n[y] >= item_bonus && item_type == 3 || drop_svitok_l[y] >= item_bonus && item_type != 3)) scroll = 1;}}

				if (item_bonus > 3 && title.match(/Рюкзак|Сундук/) && (ss.prem == 1 || mark[10] != 1))
				{
					for (var y = 0; y <= 12; y++)
					{
						if (item_name.match(name_scrl[y]) && (actv_svitok_n[y] >= item_bonus && item_type == 3 || actv_svitok_l[y] >= item_bonus && item_type == 1) && (svitok[y] == 3 || /нет/.test(svitok[y])))
						{
							click(item, tmt);
							break;
						}
					}
				}

				if (lvl_drop_st >= item_bonus && item_name.match(/Изумруд|Обсидиан|Сапфир|Корунд|Оникс/i) && title.match(/Рюкзак|Сундук/i) && !klan)
				{
					click(item, tmt);
					break;
				}
				else if (lvl_drop_st >= item_bonus && item_name.match(/Изумруд|Обсидиан|Сапфир|Корунд|Оникс/i) && title.match(/Рюкзак|Сундук/i) && klan) mark[26]++;

				else if (lvl_shmot >= item_bonus && title.match('Сундук') && div[i].textContent.match(/Лучше \(\+(\d+)\)/i) && div[i].getElementsByClassName('itemBad')[0] == undefined)
				{
					click(item, tmt); break;
				}
				else if (item_bonus < 4 && set_razbor && title.match(/Рюкзак|Сундук/) && item_name.match(/Ветерана|Дружинника|Воина|Охотника/i) && !div[i].textContent.match(/Лучше \(\+(\d+)\)/i))
				{
					click(item, tmt); break;
				}
				else if ((item_bonus == 4 && epic || item_bonus == 5 && leg) && set_razbor && title.match(/Рюкзак|Сундук/) && !div[i].textContent.match(/Лучше \(\+(\d+)\)/i))
				{
					click(item, tmt); break;
				}
				else if (item_bonus == 6 && mif && title.match(/Рюкзак|Сундук/i) && !div[i].textContent.match(/Лучше \(\+(\d+)\)/i) && item_type != 1 )
				{
					click(item, tmt); break;
				}
				if (lvl_shmot < item_bonus && title.match("Рюкзак") && div[i].textContent.match(/Лучше \(\+(\d+)\)/i) && mark[7] == 1)
				{
					mark[13] = comp_time + r_num(2000, 5000);
				}
				else
				{
					var wear = '', to_store = '', toRack = '', scroll_use = '', openbox = '', drop = '', to_storage = '';

					for (var y = 1; y < div[i].getElementsByTagName('a').length; y++)
					{
						var lnk = div[i].getElementsByTagName('a')[y];
						var act = r_txt(div[i].getElementsByTagName('a')[y].textContent);

						if (act.match("надеть") && div[i].getElementsByClassName('itemBad')[0] == undefined && div[i].textContent.match(/Лучше \(\+(\d+)\)/i)) wear = lnk;
						if (item_name.match('Запертый ящик') && act.match(/открыть/i) && title.match(/Рюкзак|Сундук/)) openbox = lnk;
						if (act.match("в рюкзак") && !title.match('Сундук')) toRack = lnk;
						if (act.match("в рюкзак") && title.match('Сундук') && lvl_drop_st >= item_bonus && item_name.match(/Изумруд|Обсидиан|Сапфир|Корунд|Оникс/i)) toRack = lnk;
						if (title.match("Рюкзак") && act.match("выкинуть")) drop = lnk;
						if (act.match(/использовать за \d+/i) && title.match(/Рюкзак|Сундук/)) scroll_use = lnk;
						if (act.match(/в хранилище/) && title.match(/Рюкзак|Сундук/) && (lvl_drop_st >= item_bonus && item_name.match(/Изумруд|Обсидиан|Сапфир|Корунд|Оникс/i))) to_storage = lnk;
						if (lnk.href.match("toStoreLink") && mark[7] != 1) to_store = lnk;
						if (lnk.href.match("toStoreLink") && mark[7] != 1 && !(lvl_drop_st >= item_bonus && item_name.match(/Изумруд|Обсидиан|Сапфир|Корунд|Оникс/i))) to_store = lnk;
					}
					if (wear != '' && lvl_shmot >= item_bonus) click(wear, tmt);
					else if (openbox != '' && lvl_openbox >= item_bonus) click(openbox, tmt);
					else if (scroll_use != '' && item_bonus <= 3)
					{
						for (var y = 0; y <= 12; y++)
						if ((actv_svitok_n[y] >= item_bonus && item_type == 3 || actv_svitok_l[y] >= item_bonus && item_type != 3) && (svitok[y] == 0 || /нет/.test(svitok[y])) && item_name.match(name_scrl[y]))
						{
							svitok[y] = comp_time + 5000;
							click(scroll_use, tmt);
							ss.svitok = svitok;
							break;
						}
					}
					if (!action && toRack != '') click(toRack, tmt);
					else if (scroll && title.match(/Рюкзак|Сундук/))
					{
						click(item, tmt);
						break;
					}
					else if (to_storage != '') click(to_storage, tmt);
					else if (drop != '') click(drop, tmt);
					else if (to_store != '') click(to_store, tmt);
					else if (drop != '') click(drop, tmt);
				}
			}
	//		if (title.match('Сундук') && svitki_link != '' && !(kamni_link == '' && rus_t.match(/\| Камни (\|)?/))) click(svitki_link, tmt);
	//		if (title.match('Сундук') && svitki_link != '' && !rus_t.match(/\| Камни (\|)?/)) click(svitki_link, tmt);
	//		if (title.match('Сундук') && kamni_link != '') click(kamni_link, tmt);

			if (v_sunduk != '' && title.match("Рюкзак") && mark[7] == 1 && mark[26] == 0 && full_bag && !action) click(location.href, 60000);

			if (title.match("Рюкзак")) click(openstore, tmt);
			if (title.match("Сундук") && next_page != '') click(next_page, tmt);

			if (!action && title.match("Сундук"))
			{
				for (var i = 0; i <= 12; i++)
				{
					if ((actv_svitok_n[i] > 0 || actv_svitok_l[i] > 0) && (svitok[i] == 0 || /нет/.test(svitok[i])))
					{
						svitok[i] = (comp_time + r_num(1000, 3600)) + "нет"
					}
				}
				ss.svitok = svitok;
				to_abil();
			}

			if ((full_bag || (bag_better && mark[13] == 0)) && in_events == 0 && boss == 0) to_bag();

			if (!title.match(/Рюкзак|Сундук|Мои умения/i) && (ss.prem == 1 || mark[10] == 0)) for (var i = 0; i <= 12; i++)
			{
				if ((actv_svitok_n[i] > 0 || actv_svitok_l[i] > 0) && svitok[i] == 0)
				{
					to_bag();
					break;
				}
			}
			function to_abil()
			{
				mark[20] = 1;
				if (title.match("Мои умения")) mark[20] = 0;
				else if (title.match("Мой герой") && abilities != '') click(abilities, tmt);
				else if ((in_towers != 0 || err_d == 1) && (in_events == 0 || (title.match(/Арена|Выживание/) && pokinut_ochered == '' && (noviu_boy != '' || vstat_v_ochered != '' || rus_t.match("Ваш герой погиб, ждите окончания боя"))))) click(na_glavnuy, tmt);
				else click(user, tmt);
			}
			function to_bag()
			{
				if ((in_towers != 0 || err_d == 1) && (in_events == 0 || (title.match(/Арена|Выживание/) && pokinut_ochered == '' && (noviu_boy != '' || vstat_v_ochered != '' || rus_t.match("Ваш герой погиб, ждите окончания боя"))))) click(na_glavnuy, tmt);
				else if (bag != '') click(bag, tmt);
				else click(user, tmt);
			}
		}
	}
}
function stone_drop()
{
	var stone_bonus = 7;
	if (title.match(/Хранилище клана/i))
	{
		if (add_stone != '') click(add_stone, tmt);
		if (rus_t.match(/Добавление камней/i))
		{
			for (i = 1; i < div.length; i++)
			{
				if (div[i].getElementsByTagName('a').length == 2 && div[i].getElementsByTagName('img').length == 1 && div[i].textContent.match(/выбрать/))
				{
					for (var y = 0; y < div[i].getElementsByTagName('img').length; y++)
					{
						var type_img = div[i].getElementsByTagName('img')[y].src;

						if (type_img.match('bonusdarkiron')) {stone_bonus = 6; break;}
						else if (type_img.match('bonuslegendary')) {stone_bonus = 5; break;}
						else if (type_img.match('bonusepic')) {stone_bonus = 4; break;}
						else if (type_img.match('bonusrare')) {stone_bonus = 3; break;}
						else if (type_img.match('bonusgreen')) {stone_bonus = 2; break;}
						else if (type_img.match('bonuscopper')) {stone_bonus = 1; break;}
					}
					if (lvl_drop_st >= stone_bonus) {click(div[i].getElementsByTagName('a')[1], tmt); break;}
				}
				else if (i + 1 == div.length) mark[26] = 0;
			}
		}
		else if (rus_t.match(/Этот камень добавит/i) && confirm_link != '') click(confirm_link, tmt);
		else if (add_stone == '') mark[26] = 0;
	}
	else if (!title.match(/Хранилище клана/i) && klan != '') click('/guild/storage/0' + guild_id, spt);
}
function repair()
{
	if (in_events == 0 && boss == 0)
	{
		if (title.match("Моё снаряжение"))
		{
			if (rus_t.match(/не хватает железа/i) && mark[9] == 2)
			{
			//	alert('Не хватает железа');
			//	action = 1
			click(location.href, r_num(30000, 60000));
			}
			else if (pochinit_vse != '' && pochinit_vse_za >= chinit_vse && mark[9] == 0)
			{
				mark[9] = 1;
				click(pochinit_vse, tmt);
			}
			else if (pochinit != '')
			{
				mark[9] = 2;
				click(pochinit, tmt);
			}
			else if (pochinit == '') mark[9] = 0;
		}
		else if (clothes_broken)
		{
			if (in_towers != 0) click(na_glavnuy, tmt)
			else if (body != '') click(body, tmt)
		}
	}
}
function to_altar()
{
	if (title.match("Алтарь клана"))
	{
		var reg1 = /Твой бонус: \+(\d+)((\.|,))?(\d+)?% \[(\d+):(\d+):(\d+)/i
		if (reg1.test(rus_t))
		{
			bonus[8] = get_sec(f_time.exec(reg1.exec(rus_t))) + comp_time;
		}
		else
		{
			mark[16] = comp_time + r_num(1000, 3600);
			click(na_glavnuy, tmt);
		}

		var max = /Алтарь клана, (\d+) ур./i
		if (max.test(rus_t)) ss.max_alt = Number(max.exec(rus_t)[1]);
	}
	if (title.match("Мой герой") && altar != '')
	{
		var reg2 = /алтарь \+(\d+)(\.)?(\d+)?% \[(\d+):(\d+):(\d+)/i
		if (rus_t.match("алтарь не активен")) bonus[8] = 0;
		else if (reg2.test(rus_t))
		{
			at = f_time.exec(reg2.exec(rus_t));
			bonus[8] = get_sec(at) + comp_time
		}
		else
		{
			mark[16] = comp_time + r_num(1000, 3600);
			click(na_glavnuy, tmt);
		}
	}
	if (ss.altar != undefined && (!good_alt && ss.altar == 2 || (bonus[8] - comp_time) < 600) && (ss.user.match('премиум') || mark[10] == 0) && mark[16] == 0 && klan != '')
	{
		if (!title.match(/Мой герой|Алтарь/) && altar == '' && user != '') click(user, tmt);
		get_altar();
	}
	if (set_altar > 0 /*&& (ss.user.match('премиум') || mark[11] == 0) && mark[16] == 0*/ && klan != '')
	{
		if (altar != '' && (boss || in_events != 0)) click(altar, tmt)
		else
		{
			alttime = bonus[8] - comp_time
			if ((alttime < 300 && title.match("Алтарь клана")) || (alttime < 100 && title.match("Мой герой")) || alttime <= 0) get_altar();
		}
	}
	function get_altar()
	{
		if (title.match("Мой герой") && altar != '') click(altar, tmt)
		else if (title.match("Алтарь клана"))
		{
			if (ss.altar == 1 && altarjelezo != '') {mark[16] = comp_time + 300; click(altarjelezo, tmt);}
			else if (ss.altar == 2 && altarserebro != '') {mark[16] = comp_time + 300; click(altarserebro, tmt);}
			else if (set_altar == 1 && altarjelezo != '' && alttime < 300) {mark[16] = comp_time + 300; click(altarjelezo, tmt);}
			else if (set_altar == 2 && altarserebro != '' && alttime < 300) {mark[16] = comp_time + 300; click(altarserebro, tmt);}
			else if (set_altar == 3 && altarcastle != '' && alttime < 300) {mark[16] = comp_time + 300; click(altarcastle, tmt);}
			else if (set_altar == 4 && altar_all_castle != '' && alttime < 300) {mark[16] = comp_time + 300; click(altar_all_castle, tmt);}
		}
		else if (boss == 0 && vboy == '' && (in_events == 0 || (title.match(/Арена|Выживание/) && pokinut_ochered == '' && (noviu_boy != '' || vstat_v_ochered != '' || rus_t.match("Вы погибли, ждите окончания боя"))))) click(user, tmt)
	}
	if (klan == '')	{bonus[8] = 0; mark[16] = 0}
	ss.bonus = bonus
}
function no_prem_altar()
{
	for (var i = 0; i < 12; i++)
	{
		if (no_prem_altar[0] != 0 && i == 0 && in_towers != 0) 
		{
			ss.altar = no_prem_alt[0];
		}
		if (no_prem_altar[1] != 0 && i == 1 && attack == '' && !rus_t.match(/через (\d+) сек|Ваш герой погиб/) && title.match('Арена')) 
		{
			ss.altar = no_prem_alt[1];
		}
		if (no_prem_altar[2] != 0 && i == 2 && attack == '' && heal == '' && vzamok == '' && in_events == 11) 
		{
			ss.altar = no_prem_alt[2];
		}
		if (no_prem_altar[3] != 0 && i == 3 && attack == '' && (title.match(/Турнир героев/) || title.match(/Передышка/) && !rus_t.match(/Наши:/)))  
		{
			ss.altar = no_prem_alt[3];
		}
		if (no_prem_altar[4] != 0 && i == 4 && attack == '' && (title.match(/Командный турнир/) || title.match(/Передышка/) && rus_t.match(/Наши:/))) 
		{
			ss.altar = no_prem_alt[4];
		}
		if (no_prem_altar[5] != 0 && i == 5 && attack == '' &&!rus_t.match(/через (\d+) сек|Ваш герой погиб/) && title.match('Выживание')) 
		{
			ss.altar = no_prem_alt[5];
		} 
		if (no_prem_altar[6] != 0 && i == 6 && attack == '' && heal == '' && !rus_t.match(/откроется|через (\d+) сек|Битва претендентов/) && title.match('Территория')) 
		{
			ss.altar = no_prem_alt[6];
		}
		if (no_prem_altar[7] != 0 && i == 7 && attack == '' && heal == '' && title.match('Битва героев')) 
		{
			ss.altar = no_prem_alt[7];
		}
		if (no_prem_altar[8] != 0 && i == 8 && attack == '' && !rus_t.match(/через (\d+) сек/) && title.match('Поля сражений')) 
		{
			ss.altar = no_prem_alt[8];
		}
		if (no_prem_altar[9] != 0 && i == 9 && attack == '' && heal == '' && boss) 
		{
			ss.altar = no_prem_alt[9];
		}
		if (no_prem_altar[10] != 0 && i == 10 && attack == '' && heal == '' && title.match('Логово Геррода')) 
		{
			ss.altar = no_prem_alt[10];
		}
		if (no_prem_altar[11] != 0 && i == 11 && attack == '' && title.match(/Цари Горы/i)) 
		{
			ss.altar = no_prem_alt[11];
		}
		if (no_prem_altar[12] != 0 && i == 12 && attack == '' && vernutsa != '' && title.match(/Город Древних|Врата|Стены|Храм|Площадь|Мифриловый Зал/)) 
		{
			ss.altar = no_prem_alt[12];
		}
		if (no_prem_altar[13] != 0 && i == 13 && attack == '' && in_events == 12) 
		{
			ss.altar = no_prem_alt[13];
		}
	}
}
function castle_buff()
{
	if (title.match('Бонус замка'))
	{
		for (var i = 0; i <= 7; i++)
		{
			var reg = new RegExp(castle_name[i] + " \\[(\\d+):(\\d+):(\\d+)", "i");
			if (reg.test(rus_t))
			{
				bonus[i] = get_sec(reg.exec(rus_t)) + comp_time;
			}
		}
	}
	var time = 200;
	if (vzamok != '' && in_events == 11)
	{
		if (nochar != '') mark[15] = 1;
		var reg = /Твой текущий бонус: ((шанс (\d+)% )|(\+(\d+)% (\D+)?\s?))\[(\d+):(\d+):(\d+)/i;
		if (reg.test(rus_t))
		{
			time = get_sec(f_time.exec(reg.exec(rus_t)));
			for (var i = 0; i <= 7; i++)
			{
				if (title.match(castle_name[i])) bonus[i] = time + comp_time;
			}
		}
	}
	for (var i = 0; i <= 7; i++)
	{
		if (title.match(castle_name[i]) && set_buffs[i] == 1 && get_buff != '' && time < 120 && mark[10] == 0)
		{
			click(get_buff, tmt);
			break;
		}
	}
	if ((in_events == 0 || (title.match(/Арена|Выживание/) && pokinut_ochered == '' && (noviu_boy != '' || vstat_v_ochered != '' || rus_t.match("Ваш герой погиб, ждите окончания боя")))) && boss == 0 && in_events != 11 && mark[10] == 0) for (var i = 0; i <= 7; i++)
	{
		if (set_buffs[i] == 1 && (bonus[i] - comp_time) <= 0) click('/castle/' + (i + 1) + '/', spt);
	}
	ss.bonus = bonus;
}
function some_()
{
	if (ss.user.match('lg\.') && klan != '') moderate = 1;
	var time = 200;
	if (title.match(/Башня мудрости|Статуя критона|Академия клана/i))
	{
		var reg = /Бонус клана: \+(\d+)(\.)?(\d+)?% (клан. опыта|крит|личного опыта) \[(\d+):(\d+):(\d+)]/i;
		if (reg.test(rus_t))
		{
			time = get_sec(f_time.exec(reg.exec(rus_t)));
			for (var i = 0; i <= 2; i++)
			{
				if (title.match(some_name[i])) cita[i] = time + comp_time;
			}
		}
	}
	for (var i = 0; i <= 2; i++)
	{
		if (title.match(some_name[i]) && set_citadel[i] == 1 && get_cita != '' && time < 120)
		{
			click(get_cita, tmt);
			break;
		}
	}
	if (in_events == 0 && boss == 0 && moderate || (in_events != 0 && noviu_boy != '' && moderate)) if (set_citadel[0] == 1 && (cita[0] - comp_time) <= 0) click('/guild/citadel/temple' + guild_id + '/2/', spt);
	else if (set_citadel[1] == 1 && (cita[1] - comp_time) <= 0) click('/guild/citadel/temple' + guild_id + '/1/', spt);
	else if (set_citadel[2] == 1 && (cita[2] - comp_time) <= 0) click('/guild/citadel/temple' + guild_id + '/5/', spt);

	ss.cita = cita;
}
function get_castles()
{
	if (title.match('Замки варваров'))
	{
		ss.castle_time = '';
		var reg = /до захвата: (\d+):(\d+):(\d+)|идет захват|готов к захвату/ig;
		while ((time = reg.exec(rus_t)) != null)
		{
			if (/идет захват|готов к захвату/i.test(time[0])) ss.castle_time += (comp_time + r_num(500, 1000)) + ',';
			else if (f_time.test(time[0]))
			{
				ss.castle_time += (get_sec(f_time.exec(time[0])) + comp_time) + ',';
			}
		}
	}
	if (ss.castle_time == undefined) to_castles();
	if (ss.castle_time != undefined)
	{
		var castle_time = ss.castle_time.split(",");
		for (var i = 0; i <= 7; i++)
		{
			if (new_day) castle_time[i] = castle_time[i] - 86400;
			var ct = castle_time[i] - comp_time;
			if (castle_time[i] == 0 && castle_time[i] == 1) to_castles();
			else if (ct <= 0) castle_time[i] = 0;
			if (ct != '' && ct > 0 && ct < 240 && set_castles[i] == 1)
			{
				if (title.match(/Замки Варваров/i) && castle[i] != undefined) click(a[castle[i]], tmt);
				else if (title.match(castle_name[i]) && vzamok != '') click(vzamok, tmt, 1);
				else if (ct < 240 && ct != '') to_castles();
			}
		}
		ss.castle_time = castle_time;
	}

	function to_castles(x)
	{
		if (title.match('Варвары') && castles != '') click(castles, tmt);
		else if (boss == 0 && (in_events == 0 || (title.match(/Арена|Выживание/) && pokinut_ochered == '' && (noviu_boy != '' || vstat_v_ochered != '' || rus_t.match("Ваш герой погиб, ждите окончания боя")))) && vboy == '') click(na_glavnuy, tmt);
	}
}
function to_boss()
{
	if (title.match(/Пещеры и драконы/i))
	{
		for (var i = 0; i <= 12; i++)
		{
			var reg = new RegExp(dung_name[i] + " до старта (\\d+):(\\d+):(\\d+)", "i");
			if (reg.test(rus_t))
			{
				dungeon[i] = get_sec(reg.exec(rus_t)) + comp_time;
				if (ss.to_boss == i) ss.removeItem("to_boss");
			}
			else if (rus_t.match(dung_name[i]) && !/неуд\./.test(dungeon[i])) dungeon[i] = 0;
		}
		ss.dungeon = dungeon;
	}

//	if (err_d || (title.match(/Вход закрыт/i) && rus_t.match(/разрешен только членам кланов/i)))
	if (title.match(/Вход закрыт/i) && rus_t.match(/разрешен только членам кланов/i))
	{
		ss.removeItem("to_boss");
		click(na_glavnuy, obnovlenie);
	}
	else if (err_d == 1) click(na_glavnuy, obnovlenie);
	
	if (ss.to_boss == undefined && ss.territory == undefined || ss.territory == undefined)
	{
		if (small_boss[3] == 1 && strong > 1200 && dungeon[4] == 0) ss.to_boss = 4;
		else if (small_boss[2] == 1 && lvl > 20 && dungeon[3] == 0) ss.to_boss = 3;
		else if (small_boss[1] == 1 && lvl > 20 && dungeon[2] == 0) ss.to_boss = 2;
		else if (small_boss[0] == 1 && lvl > 15 && dungeon[1] == 0) ss.to_boss = 1;
	}
	if (vboy == '' && (in_events == 0 || (title.match(/Арена|Выживание/) && pokinut_ochered == '' && (noviu_boy != '' || vstat_v_ochered != '' || rus_t.match("Ваш герой погиб, ждите окончания боя")))) && ss.to_boss != undefined && ss.territory==undefined) v_pesheru(ss.to_boss);

	function v_pesheru(x)
	{
		if (rus_t.match("Ваш герой погиб в бою") && obnovit != '') click(na_glavnuy, tmt);
		var reg = new RegExp(dung_name[x], "i");
		if (title.match(reg) && ss.to_boss == x) ss.removeItem("to_boss");
		else if (dungeon[x] == 0)
		{
			if (title.match('Варвары') && dnd != '') click(dnd, tmt);
			else if (title.match('Пещеры и драконы') && x != undefined && peshera[x] != undefined)
			{
				ss.removeItem("to_boss");
				click(a[peshera[x]], tmt);
			}
			else if (boss == 0) click(na_glavnuy, tmt);
		}
		else ss.removeItem("to_boss");
	}
}
function boss_raid()
{
	var dung_list = []; var dung_notify = []; var set_dung = [];

	dung_list[5] = mif_list; dung_notify[5] = mif_notify; set_dung[5] = set_mif;
	dung_list[6] = nemka_list; dung_notify[6] = nemka_notify; set_dung[6] = set_nemka;
	dung_list[7] = troll_list; dung_notify[7] = troll_notify; set_dung[7] = set_troll;
	dung_list[8] = zod_list; dung_notify[8] = zod_notify; set_dung[8] = set_zod;
	dung_list[10] = vel_list; dung_notify[10] = vel_notify; set_dung[10] = set_vel;
	dung_list[11] = pred_list; dung_notify[11] = pred_notify; set_dung[11] = set_pred;
	dung_list[12] = legn_list; dung_notify[12] = legn_notify; set_dung[12] = set_legn;

	var plr_list = body_t; var num_plr = 0; var exit_text= '';

	if (ss.boss_time == undefined) ss.boss_time = 0;
	if (ss.notify == undefined || in_towers != 0 || in_events != 0 || title.match(/Варвары/)) ss.notify = 0;

	plr_list = plr_list.replace(/(.|\n)+Кто здесь( \[\d+ из \d+\])?/, '');
	plr_list = plr_list.trim();
	plr_list = plr_list.replace(/Обновить(.|\s|\n)+/, '');
	plr_list = plr_list.replace(/\n{2}/g, '\n');
	plr_list = plr_list.replace(/\n{2,}/g, ',');

	plr_list = plr_list.replace(/(\r|\f|\t|\v)/g, '');

	var plr_boss = plr_list.split(","); plr_boss.pop();
	for (var i = 0; i < plr_boss.length; i++) if (plr_list.match(/.+/)) plr_boss[i] = plr_boss[i].trim(); 
	for (var i = 0; i < plr_boss.length; i++) if (plr_list.match(/.+/)) plr_boss[i] = plr_boss[i].replace(/^ /, '').replace(/ $/, "");
	
	for (var x = 5; x <= 12; x++) if (x != 9) { var reg = new RegExp(dung_name[x], "i"); if (title.match(reg)) ss.dung_num = x; if (boss == 0 && vboy == '') ss.removeItem('dung_num');}
	for (var x = 5; x <= 12; x++) if (x != 9)
	{
		var reg = new RegExp(dung_name[x], "i");
		var dung_time = /(\d+):(\d+)\/(\d+):(\d+)/.exec(set_dung[x].split(" ")[1]);
		var dung_min = dung_time[1] * 3600 + dung_time[2] * 60;
		var dung_max = dung_time[3] * 3600 + dung_time[4] * 60;
		
		var plr_dung = dung_list[x].split(",");

		if (dung_max >= time_serv && dung_min <= time_serv && klan != '' && dungeon[x] == 0)
		{
			if (set_dung[x].split(" ")[0].match(/\+/) && ss.to_boss == undefined) ss.to_boss = x;
			if (set_dung[x].split(" ")[0].match(/\+/) && (boss != 0 || title.match(/Клан/)) && (ss.notify >= 10 || ss.notify == 0)) send_notify(dung_notify[ss.dung_num].split("/")[0], 1);

			if (title.match(reg) && set_dung[x].split(" ")[0].match(/\+/) && boss_start != '')
			{
				for (var i = 0; i < plr_boss.length; i++)
				{
					if (plr_list.match(plr_dung[i])) {plr_list = plr_list.replace(plr_dung[i], ','); num_plr++;}
					if (!dung_list[x].match(plr_boss[i]) && !rus_t.match(r_txt(plr_boss[i] + ' выход')))  exit_text += ' ' + plr_boss[i] + ' выход';
				}
				if ((ss.boss_time > 4 || document.body.innerHTML.match(/_green/g).length == plr_dung.length && rus_t.match(/я не готов/i)) && num_plr == plr_dung.length) click(boss_start, tmt);
				else if (num_plr == plr_dung.length) ss.boss_time++;
				else {ss.boss_time = 0; if (ss.notify != 0) ss.notify++;}

				if (exit_text != '') send_notify(exit_text, 2);
			}
			else ss.boss_time = 0;
		}
		else if (title.match(reg) && dung_max <= time_serv && (dung_max + 90) >= time_serv && attack == '' && heal == '' && !rus_t.match(r_txt(dung_notify[ss.dung_num].split("/")[1]))) {send_notify(dung_notify[ss.dung_num].split("/")[1], 2); ss.notify = 0; ss.removeItem("to_boss");}
	}
	function send_notify(text, type)
	{
			if (text == '') return;
			
			if ((in_towers || in_events) && vboy == '' || err_d) click(na_glavnuy, tmt);
			else if (type == 1 && title.match(/Клан/i) && klan_moderate != ''  && !rus_t.match(/Новое объявление/)) click(klan_moderate, spt);
			else if (type == 1 && klan != '' && !title.match(/Клан/i)) click(klan, spt);
			else if (type == 2) write_notify(text);
			else if (title.match(/Клан/i) && rus_t.match(/Новое объявление/i) && type == 1)
			{
				var strong_txt = document.getElementsByTagName("strong");
				for (var i = 0; i < strong_txt.length; i++)
				{
					if (r_txt(strong_txt[i].textContent).match(/Объявление клана/i))
					{
						var minor_txt = document.getElementsByClassName('minor small');					
						for (var k=0; k < minor_txt.length; k++)
						{
							if (r_txt(minor_txt[k].textContent).match(/секунд|^(1|2|3|4) минут/))
							{
								for (var z = 0; z < document.getElementsByClassName('info').length; z++)
								{
									var info_txt = document.getElementsByClassName('info')[z].textContent;
									if (info_txt.match(/\/\//))
									{
										for (var v = 5; v <= 12; v++) if (v != 9) info_txt = info_txt.replace(dung_notify[v].split("/")[0], '');
										info_txt = info_txt.replace(/\/\/(.|\s|\n)+/,'').trim() + ' ' + text;
										if (info_txt.length < 64) text = info_txt;
										break;
									}
								}
							}
						}
					}
				}
				write_notify(text);
			}
	}
	function write_notify(text)
	{
		action = true; ss.notify = 1;
		document.getElementsByTagName('input')[1].value = text;
		document.getElementsByTagName('input')[2].click();
	}
}
function get_territory()
{
	if (!/14|17|20/.test(server_time[1])) {ss.removeItem('territory'); mark[3] = 0;}
	if ((title.match("Вход закрыт") && rus_t.match(/Война за территории доступна только для клановых игроков|Набег начался, Вы не успели/i))) mark[3] = 1;
	if (title.match('Территория') && na_terr != '') click(na_terr, tmt);
	else if (boss == 0 && (in_events == 0 || title.match(/Территория/) && attack == '' && heal == '' || (title.match(/Арена|Выживание/) && pokinut_ochered == '' && (noviu_boy != '' || vstat_v_ochered != '' || rus_t.match("Ваш герой погиб, ждите окончания боя")))) && vboy == '' && ss.territory != undefined && server_time[1].match(/14|17|20/) && server_time[2] >= 27) click('/territory/' + ss.territory + '/');

	for (var i = 0; i <= 27; i++) if (title.match(terra_name[i]) && ss.territory == i + 1) ss.removeItem('territory');

	if (mark[3] != 1) for (var i = 0; i < document.getElementsByTagName("strong").length; i++)
	{
		var strong_txt = r_txt(document.getElementsByTagName("strong")[i].textContent);
		if (strong_txt.match(/Объявление альянса/i) || strong_txt.match(/Объявление клана/i))
		{
			for (var i = 0; i < document.getElementsByClassName('info').length; i++)
			for (var y = 0; y < document.getElementsByClassName('minor small').length; y++)
			{
				var info_txt = r_txt(document.getElementsByClassName('info')[i].textContent);
				var minor_txt = r_txt(document.getElementsByClassName('minor small')[y].textContent);
				if (minor_txt.match(/секун(д|да|ды)|(1|2|3|4|5|6|7|8|9|10) мину(т|та|ты)/) && skrit != '') for (var j = 1; j <= 28; j++) if (info_txt.match(terra_writ[j], i)) {click(skrit, spt); ss.territory = j;}
			}
		}
	}

//	if (server_time[1] < 14 || (server_time[1] > 14 && server_time[1] < 17) || (server_time[1] > 17 && server_time[1] < 20) || server_time[1] > 20)
}
function boss_notify()
{
	for (var i = 0; i < document.getElementsByTagName("strong").length; i++)
	{
		var strong_txt = r_txt(document.getElementsByTagName("strong")[i].textContent);
		if (strong_txt.match(/Объявление клана/i))
		{
			for (var i = 0; i < document.getElementsByClassName('info').length; i++)
			for (var y = 0; y < document.getElementsByClassName('minor small').length; y++)
			{
				var info_txt = r_txt(document.getElementsByClassName('info')[i].textContent);
				var minor_txt = r_txt(document.getElementsByClassName('minor small')[y].textContent);
				if (minor_txt.match(/секун(д|да|ды)|(1|2|3|4|5|6|7|8|9|10) мину(т|та|ты)/))
				{
					if (info_txt.match(chat_attack + '|' + nick + ' гоу') && boss_start != '') click(boss_start, tmt);
					if (dungeon[5] == 0 && info_txt.match(chat_mif + '|' + nick + ' миф')) ss.to_boss = 5;
					if (dungeon[6] == 0 && info_txt.match(chat_nemka + '|' + nick + ' нема')) ss.to_boss = 6;
					if (dungeon[7] == 0 && info_txt.match(chat_troll + '|' + nick + ' троль')) ss.to_boss = 7;
					if (dungeon[8] == 0 && info_txt.match(chat_zod + '|' + nick + ' зод')) ss.to_boss = 8;
					if (dungeon[9] == 0 && info_txt.match(chat_trof + '|' + nick + ' троф')) ss.to_boss = 9;
					if (dungeon[10] == 0 && info_txt.match(chat_vel + '|' + nick + ' велы')) ss.to_boss = 10;
					if (dungeon[11] == 0 && info_txt.match(chat_pred + '|' + nick + ' свят')) ss.to_boss = 11;
					if (dungeon[12] == 0 && info_txt.match(chat_legn + '|' + nick + ' легион')) ss.to_boss = 12;

					if (info_txt.match(chat_exit + '|' + nick + ' выход')) {if (boss) {ss.removeItem("to_boss"); click(na_glavnuy, tmt);} break;}
					if (info_txt.match(chat_start + '|' + nick + ' старт')) {ss.to_chat = 0; break;}
					if (info_txt.match(chat_stop + '|' + nick + ' стоп') && (in_towers != 0 || in_events != 0 || boss))
					{
						if (klan != '') {ss.to_chat = 1; click('/guild/chat', tmt);}
						else ss.to_chat = 0; break;
					}
				}
			}
		}
	}
}
function get_battle()
{
	var rand = r_num(4);

	if ((in_events == 0 || (title.match(/Арена|Выживание/) && pokinut_ochered == '' && (noviu_boy != '' || vstat_v_ochered != '' || rus_t.match("Ваш герой погиб, ждите окончания боя")))) && boss == 0 && vboy == '')
	{
		if (set_cari && lvl >= 25 && (server_time[1] == 19 && server_time[2] >= 07 && server_time[2] <= 10 || server_time[1] == 13 && server_time[2] >= 37 && server_time[2] < 40))
		{
			mark[4] = 1;
			if (title.match('Варвары') && cargori != '') click(cargori, tmt);
			else click(na_glavnuy, tmt);
		}
		if (set_bmess && (/12|21/.test(server_time[1]) && server_time[2] >= 08 && server_time[2] <= 24) && lvl >= 35)
		{
			if (sets_ackiv[0] == 1 && title.match('Варвары')) if (ss.abilities[0] >= abil_num[11] && !ss.abilities.match(abil_num[11] + ','))
			{
				ss.set_abil = abil_num[11]; ss.change_set += 'a'; select_abil();
			}
			if (sets_ackiv[1] == 1 && title.match('Варвары')) if (ss.stances[0] >= stan_num[11] && !ss.stances.match(stan_num[11] + ','))
			{
				ss.set_stan = stan_num[11]; ss.change_set += 's'; select_stan();
			}
			if (sets_ackiv[2] == 1 && title.match('Варвары')) if (ss.body[0] >= body_num[11] && !ss.body.match(body_num[11] + ','))
			{
				ss.set_body = body_num[11];ss.change_set += 'b';  select_body();
			}
			if (title.match('Варвары|Великие битвы') && bmess != '') click(bmess, tmt);
			else if (title.match('Варвары|Великие битвы') && bmess == '' && greats != '') click(greats, tmt);
			else click(na_glavnuy, tmt);
		}
		if (battle_ground && lvl >= 25 && mark[4] != 1 && server_time[2] >= 56)
		{
			if (title.match('Варвары') && bg != '') click(bg, tmt);
			else click(na_glavnuy, tmt);
		}
		if ((tournament == 1 || tournament == 2) && mark[8] != 1)
		{
			if (title.match('Варвары') && turnir1x1 != '') click(turnir1x1, tmt);
			else if (/10|15|21/.test(server_time[1]) && /26|27|28|29/.test(server_time[2])) click(na_glavnuy, tmt);
		}
		if ((tournament == 2 || tournament == 3) && mark[8] != 1)
		{
			if (title.match('Варвары') && turnir2x2 != '') click(turnir2x2, tmt);
			else if (/12|19|23/.test(server_time[1]) && /26|27|28|29/.test(server_time[2])) click(na_glavnuy, tmt);
		}
		if (set_battle && mark[8] != 1 && lvl >= 25)
		{
			if (title.match('Варвары') && battle != '') click(battle, tmt);
			else if (/13|18/.test(server_time[1]) && /26|27|28|29/.test(server_time[2])) click(na_glavnuy, tmt);
		}
		if (set_logovo && lvl >= 25)
		{
			if (title.match('Варвары') && logovo != '') click(logovo, tmt);
			else if (/11|22|00/.test(server_time[1]) && /26|27|28|29/.test(server_time[2])) click(na_glavnuy, tmt);
		}
		if ((dungeon_duel == 1 || dungeon_duel == 2) &&  dungeon[13] == 0)
		{
			if (sets_ackiv[0] == 1 && title.match('Варвары') && dung_game != '') if (ss.abilities[0] >= abil_num[12] && !ss.abilities.match(abil_num[12] + ','))
			{
				ss.set_abil = abil_num[12]; ss.change_set += 'a'; select_abil();
			}
			if (sets_ackiv[1] == 1 && title.match('Варвары') && dung_game != '') if (ss.stances[0] >= stan_num[12] && !ss.stances.match(stan_num[12] + ','))
			{
				ss.set_stan = stan_num[12]; ss.change_set += 's'; select_stan();
			}
			if (sets_ackiv[2] == 1 && title.match('Варвары') && dung_game != '') if (ss.body[0] >= body_num[12] && !ss.body.match(body_num[12] + ','))
			{
				ss.set_body = body_num[12];ss.change_set += 'b'; select_body();
			}
			if ((title.match('Варвары') || in_events == 12) &&  dung_game != '') click(dung_game, tmt);
			else click(na_glavnuy, tmt);
		}
		if ((dungeon_duel == 1 || dungeon_duel == 2) &&  dungeon[14] == 0)
		{
			if (sets_ackiv[0] == 1 && title.match('Варвары') && duel != '') if (ss.abilities[0] >= abil_num[12] && !ss.abilities.match(abil_num[12] + ','))
			{
				ss.set_abil = abil_num[12]; ss.change_set += 'a'; select_abil();
			}
			if (sets_ackiv[1] == 1 && title.match('Варвары') && duel != '') if (ss.stances[0] >= stan_num[12] && !ss.stances.match(stan_num[12] + ','))
			{
				ss.set_stan = stan_num[12]; ss.change_set += 's'; select_stan();
			}
			if (sets_ackiv[2] == 1 && title.match('Варвары') && duel != '') if (ss.body[0] >= body_num[12] && !ss.body.match(body_num[12] + ','))
			{
				ss.set_body = body_num[12]; ss.change_set += 'b'; select_body();
			}
			if ((title.match('Варвары') || in_events == 12) &&  duel != '') click(duel, tmt);
			else click(na_glavnuy, tmt);
		}
		if (return_loc == 2 && !title.match('Выживание') && lvl >= 30 && mark[18] == 0)
		{
			if (title.match('Варвары') && survival != '') click(survival, tmt);
			else click(na_glavnuy, tmt);
		}
		else if (return_loc == 3 && !title.match('Арена') && lvl >= 25 && mark[17] == 0)
		{
			if (title.match('Варвары') && arena != '') click(arena, tmt);
			else click(na_glavnuy, tmt);
		}
		else if ((return_loc == 2 && set_escape == 1 || return_loc == 4) && !title.match('Арена') && lvl >= 25 && mark[18] != 0 && mark[17] == 0)
		{
			if (title.match('Варвары') && arena != '') click(arena, tmt);
			else click(na_glavnuy, tmt);
		}
		else if ((return_loc == 3 && set_escape == 1 || return_loc == 4) && !title.match('Выживание') && lvl >= 30 && mark[17] != 0 && mark[18] == 0)
		{
			if (title.match('Варвары') && survival != '') click(survival, tmt);
			else click(na_glavnuy, tmt);
		}
		else if (return_loc == 4 && !title.match('Выживание') && lvl >= 30 && mark[18] == 0 && (mark[24] == 1 || mark[23] == 0 && mark[24] == 0 && !title.match('Арена')))
		{
			if (title.match('Варвары') && survival != '') click(survival, tmt);
			else click(na_glavnuy, tmt);
		}
		else if (return_loc == 4 && !title.match('Арена') && lvl >= 25 && mark[17] == 0 && (mark[23] == 1 || mark[23] == 0 && mark[24] == 0 && !title.match('Выживание')))
		{
			if (title.match('Варвары') && arena != '') click(arena, tmt);
			else click(na_glavnuy, tmt);
		}
		else if ((return_loc >= 2 && return_loc <= 4) && mark[17] != 0 && mark[18] != 0 && title.match('Варвары') && set_escape == 1) click(location.href, r_num(30000, 60000));
		else if (return_loc == 2 && mark[18] != 0 && title.match('Варвары') && set_escape == 0) click(location.href, r_num(30000, 60000));
		else if (return_loc == 3 && mark[17] != 0 && title.match('Варвары') && set_escape == 0) click(location.href, r_num(30000, 60000));
	}
	if (title.match("Поля сражений") && (server_time[2] < 55) && (server_time[3] > 3)) click(na_glavnuy, obnovlenie);

	else if (leviy_bereg != '' && title.match(/Южный Порт|Северная Крепость/) && obnovit == '' && rand > 1)
	{
		if (!rus_t.match(/через (\d+) сек/)) obnovlenie = spt;
		click(leviy_bereg, obnovlenie, 1);
	}
	else if (praviu_bereg !='' && title.match(/Южный Порт|Северная Крепость/) && obnovit == '')
	{
		if (!rus_t.match(/через (\d+) сек/)) obnovlenie = spt;
		click(praviu_bereg, obnovlenie, 1);
	}
	else if (z_bg != '' && attack == '' && title.match(/Южный Порт|Северная Крепость/) && obnovit =='' && rand==1)
	{
		if (!rus_t.match(/через (\d+) сек/)) obnovlenie = spt;
		click(z_bg, obnovlenie, 1);
	}
	else if (c_bg != '' && attack == '' && title.match(/Южный Порт|Северная Крепость/) && obnovit == '' && rand == 2)
	{
		if (!rus_t.match(/через (\d+) сек/)) obnovlenie = spt;
		click(c_bg, obnovlenie, 1);
	}
	else if (v_bg != '' && attack == '' && title.match(/Южный Порт|Северная Крепость/) && obnovit == '' && rand == 3)
	{
		if (!rus_t.match(/через (\d+) сек/)) obnovlenie = spt;
		click(v_bg, obnovlenie, 1);
	}
	else if (o_bg != '' && attack == '' && title.match(/Южный Порт|Северная Крепость/) && obnovit == '')
	{
		if (!rus_t.match(/через (\d+) сек/)) obnovlenie = spt;
		click(o_bg, obnovlenie, 1);
	}
	else if (y_bg != '' && attack == '' && title.match(/Обелиск Силы/) && obnovit == '') click(y_bg, obnovlenie, 1);
	else if (s_bg != '' && attack == '' && title.match(/Обелиск Силы/) && obnovit == '') click(s_bg, obnovlenie, 1);

	if (server_time[2] < 55) mark[4]=0;
	

}
function select_arena()
{
	var plrs = [];	var rtng = [];
	var nashi = '';	var vragi = '';
	var rtngmax = 1;

	if ((title.match(/Арена/) && (noviu_boy != '' || pokinut_ochered != '' || vstat_v_ochered != '')) || !title.match(/Арена|Выживание/) && vboy == '')
	{
		plar.length = 0; plrs.length = 0;
		rtng.length = 0; rtngs.length = 0;
	}
	if (title.match(/Арена/) && rus_t.match("Бой начнется через"))
	{
		for (var i = 1; i <= div.length; i++)
		{
			if (div[i].textContent.match("Бой начнется через"))
			{
				var div_a = div[i].getElementsByTagName('div');

				for (var y = 0; y < div_a.length; y++)
				{
					if (y == 0)
					{
						nashi = div_a[y].getElementsByTagName('span')[0].textContent;
						vragi = div_a[y].getElementsByTagName('span')[1].textContent;
					}

					nashi = parseInt(nashi);
					vragi = parseInt(vragi);

					if (y > 4 + nashi && y <= 4 + nashi + vragi)
					{
						plrs.push(div_a[y].getElementsByTagName('span')[1].textContent);
						rtng.push(div_a[y].getElementsByTagName('span')[2].textContent);
					}
				}
				break;
			}
		}
		for (var i = 0; i < vragi; i++) rtng[i] = rtng[i].match(/\d+/);

		for (var i = 0; i < vragi; i++)
		{
			for (var x = 0; x < rtng.length; x++) if (rtngmax < parseInt(rtng[x])) rtngmax = parseInt(rtng[x]);

			for (var y = 0; y < vragi; y++)
			{
				if (rtngmax == parseInt(rtng[y]))
				{
					plar[i] = plrs[y]; rtngs[i] = rtng[y];
					rtng[y] = 0; rtngmax = 1;
				}
			}
		}
		if (vragi < 4) for (var i = 1; i <= 4 - vragi; i++) plar[vragi - 1 + i] = '-';
	}

	if (title.match(/Арена/) && ss.plar.match(/.,./) && attack_vrag != '') for (var i = 0; i < 4; i++) if (rus_t.match("убил " + r_txt(plar[i]) + "|" + r_txt(plar[i]) + " сбежал с арены")) plar[i] = '-';

	for (var i = 0; i < plar.length; i++) if (white_list.match(plar[i])) plar[i] = '-';

	ss.plar = plar;
	ss.rtngs = rtngs;
}
function select_survival()
{
	var plrs = []; var rtng = [];
	var vragi = '';	var rtngmax = 20000;

	if ((title.match(/Выживание/) && (noviu_boy != '' || pokinut_ochered != '' || vstat_v_ochered != '')) || !title.match(/Арена|Выживание/) && vboy == '')
	{
		plar.length = 0; plrs.length = 0;
		rtng.length = 0; rtngs.length = 0;
	}
	if (title.match(/Выживание/) && rus_t.match("Бой начнется через"))
	{
		for (var i = 1; i <= div.length; i++)
		{
			if (div[i].textContent.match("Бой начнется через"))
			{
				var div_a = div[i].getElementsByTagName('div');

				for (var y = 0; y < div_a.length; y++)
				{
					if (y == 0) vragi = div_a[y].getElementsByTagName('span')[0].textContent;;

					vragi = parseInt(vragi);

					if (y > 3 && y <= 3 + vragi)
					{
						plrs.push(div_a[y].getElementsByTagName('span')[1].textContent);
						rtng.push(div_a[y].getElementsByTagName('span')[2].textContent);
					}
				}
				break;
			}
		}
		for (var i = 0; i < vragi; i++) rtng[i] = rtng[i].match(/\d+/);

		for (var i = 0; i < vragi; i++)
		{
			for (var x = 0; x < rtng.length; x++) if (rtngmax > parseInt(rtng[x])) rtngmax = parseInt(rtng[x]);

			for (var y = 0; y < vragi; y++)
			{
				if (rtngmax == parseInt(rtng[y]))
				{
					plar[i] = plrs[y]; rtngs[i] = rtng[y];
					rtng[y] = 21000; rtngmax = 20000;
				}
			
			}
		}
		if (vragi < 5) for (var i = 1; i <= 5 - vragi; i++) plar[vragi - 1 + i] = '-';
	}
	if (title.match(/Выживание/) && ss.plar.match(/.,./) && attack_vrag != '') for (var i = 0; i < 5; i++) if (rus_t.match("убил " + r_txt(plar[i]) + "|" + r_txt(plar[i]) + " сбежал с выживания")) plar[i] = '-';

	for (var i = 0; i < plar.length; i++) if (nick == r_txt(plar[i]) || white_list.match(plar[i])) plar[i] = '-';

	ss.plar = plar;
	ss.rtngs = rtngs;
}
function proverka_loga()
{
/*
	for (var i = 0; i < div.length; i++)
	{
		var div_x = div.getElementsByTagName("div");
		for (var x = 0; x < div_x.length; x++) if (div_x.textContent.match(/получил/)) alert();
	}
*/
	var dmg_1 = new RegExp(nick + ' (ударил|полечил) (\\D+)\s?(\\D+)?\s?(\\D+)? (по кам. щиту )?на (\\d+) (крит)?|' + nick + ' сжёг (\\d+) (крит)?', "i");
	if (dmg_1.test(rus_t))
	{
		var realvalue = (dmg_1.exec(rus_t))[0];
		real_dmg = /\d+/.exec((dmg_1.exec(rus_t))[0]);
		if (/сжёг \d+ (крит)?/.test(realvalue)) dmg_text = 1;
		if (/полечил /.test(realvalue)) dmg_text = 2;
		//	if (/ударил Гарма на \d+/.test(realvalue)) dmg_text=3;
		//	if (/ударил Цербера на \d+/.test(realvalue)) dmg_text=4;
		//	if (/ударил Немезиду на \d+/.test(realvalue)) dmg_text=5;
	}

	var dmg_2 = new RegExp('Вы промахнулись|Лечить некого|' + nick + ' (ударил|полечил) (\\D+)\s?(\\D+)?\s?(\\D+)? (по кам. щиту )?на (\\d+) (крит)?|' + nick + ' сжёг (\\d+) (крит)?', "ig");
	if (dmg_2.test(rus_t))
	{
		var str = '';
		var result = rus_t.match(dmg_2);

		for (var i = 0; i < result.length; i++) if (!str.match(nick + ' полечил')) str += result[i];

		var ln_reg = new RegExp('Лечить некого', "g");

		if (ln_reg.test(str)) {nekogo_lechit = str.match(ln_reg).length;}
	}
	var dmg_3 = new RegExp('Вы промахнулись|Лечить некого|' + nick + ' (ударил|полечил) (\\D+)\s?(\\D+)?\s?(\\D+)? (по кам. щиту )?на (\\d+) (крит)?|' + nick + ' сжёг (\\d+) (крит)?', "i");
	if (ss.missed == undefined) ss.missed = 0;
	if (dmg_3.test(rus_t) && !firstvalue && ss.perehod == 0)
	{
		var firstvalue = (dmg_3.exec(rus_t))[0];
		if (/Вы промахнулись/.test(firstvalue))
		{
			if (ss.perehod != 1) ss.missed++;
			if (vrag_med == '0' && vrag_mech == '0' && attack_kochev == '') ss.perehod = 1;
		}
		else if (/Лечить некого/.test(firstvalue)) ss.perehod = 1;
		else if (dmg_3.test(rus_t))
		{
			var dmg = /\d+/.exec(firstvalue); damage = dmg;
			if (attack_kochev != '') dmg = dmg * 1.7;
			if (/крит/.test(firstvalue)) dmg = dmg * 0.7;
			if (/полечил/.test(firstvalue)) dmg = dmg * 0.7;

			if (/по эн\. щиту/.test(firstvalue)) pronikaushii = '';
			if (/по эн\. щиту/.test(firstvalue) && activ_pronik) good_target = 2;
			if (/по эн\. щиту/.test(firstvalue) && !activ_pronik && (dmg < Number(strong * 0.07))) good_target = 2;

			if ((/(кам|энерг|отраж)/.test(firstvalue) && title.match(/Святилище предков/))) if (u_class == "воин") {cdt_boos_a = 6000; berserk = ''; kritomania = '';}
			if ((/по кам\. щиту/.test(firstvalue) && !activ_pronik && (hp_vraga > dmg * 3)) || dmg == 0) good_target = 2;
			else if (dmg < Number(strong * 0.08) && in_events == 0) ss.missed++;
			else if (dmg < Number(strong * 0.039)) ss.missed++;
			else if (Number(ss.missed) >= 1) ss.missed--;
		}
	}
	span_arr : for (var i = 0; i < span.length; i++)
	{
		var span_i = r_txt(span[i].textContent);
		if (set_chat != 0 && klan != '' && !title.match("Почта"))
		{
			if (span_i.match(chat_attack + '|' + nick + ' гоу') && boss_start != '') {click(boss_start, tmt); break span_arr;}
			if (span_i.match(chat_mif + '|' + nick + ' миф')) {ss.to_boss = 5; break span_arr;}
			if (span_i.match(chat_nemka + '|' + nick + ' нема')) {ss.to_boss = 6; break span_arr;}
			if (span_i.match(chat_troll + '|' + nick + ' троль')) {ss.to_boss = 7; break span_arr;}
			if (span_i.match(chat_zod + '|' + nick + ' зод')) {ss.to_boss = 8; break span_arr;}
			if (span_i.match(chat_trof + '|' + nick + ' троф')) {ss.to_boss = 9; break span_arr;}
			if (span_i.match(chat_vel + '|' + nick + ' велы')) {ss.to_boss = 10; break span_arr;}
			if (span_i.match(chat_pred + '|' + nick + ' свят')) {ss.to_boss = 11; break span_arr;}
			if (span_i.match(chat_legn + '|' + nick + ' легион')) {ss.to_boss = 12; break span_arr;}

			if (span_i.match(chat_exit + '|' + nick + ' выход')) {if (boss) {ss.removeItem("to_boss"); click(na_glavnuy, tmt);} break span_arr;}
			if (span_i.match(chat_start + '|' + nick + ' старт')) {ss.to_chat = 0; break span_arr;}
			if (span_i.match(chat_stop + '|' + nick + ' стоп') && (in_towers != 0 || in_events != 0 || boss))
			{
				if (klan != '') {ss.to_chat = 1; click('/guild/chat', tmt);}
				else ss.to_chat = 0; break span_arr;
			}
			if (span_i.match(chat_altar)) {ss.altar = 2; break span_arr;}
			else if (!title.match(/Алтарь клана|Мой герой/)) ss.removeItem('altar');
		}
		if (klan != '' && !title.match("Почта"))
		{
			for (var j = 1; j <= 28; j++) if (span_i.match(terra_writ[j], i) && (in_towers != 0 || title.match(/Территория/i)) && mark[3] != 1 && !title.match(terra_name[j-1])) {ss.territory = j; break span_arr;}
		
			if (u_class == "воин")
			{
				if (span_i.match("всех|медов")) {ss.attack_terr = 0; break span_arr;}
				if (span_i.match("синих")) {ss.attack_terr = 1;	break span_arr;}
				if (span_i.match("красных")) {ss.attack_terr = 2; break span_arr;}
			}
		}
	}
	if (ss.activ_log == undefined) ss.activ_log = '';
	ss.current_log = '';
	for (var i = 0; i < span.length; i++)
	{
		var span_i = r_txt(span[i].textContent);

		if (span[i].style.color.match(/chocolate|rgb\(210, 105, 30\)|rgb\(0, 204, 255\)/) && (span_i.match(/(ударил|укуси(л|ла)) (Вас|тебя) (по кам. щиту |по эн. щиту )?на (\d+)( крит)?/i) || span_i.match(nick + ' (включил|использовал)')) && !span_i.match(/(Стражник|Геррод|кочевник) ударил Вас/i))
		{
			var otrajenie = 0;
			if (span[i].getElementsByTagName('a')[0] != undefined && !span_i.match(nick + ' (включил|использовал)'))
			{
				var opponent = span[i].getElementsByTagName('a')[0].textContent;
				var Regship = new RegExp(span_i + ' ?' + opponent + ' ?применил (шипованную броню|отражение|зеркало боли)', 'ig');
				if (rus_t.match(Regship))
				{
					otrajenie = 1;
					if (in_events != 0) good_target = 2;
				}
			}
			if (otrajenie == 0)
			{
				ss.current_log += span_i;

				if (!title.match(/Арена|Выживание|тур|\d\/(\d+)/) && rus_t.match(/Наши: 1| 2 \d+:\d+/) || title.match(/Арена|Выживание|тур|\d\/(\d+)/) && !rus_t.match(/Наши: 1| 2 \d+:\d+/)) if (span_i.match(nick + ' (включил|использовал) (уворот|каменный щит)')) break;

				if (ss.activ_log.match(span_i)) {}
				else
				{
					var ur_hp = /\d+/.exec(span_i);
					all_damage += Number(ur_hp);
				}
			}
		}
	}
	ss.activ_log = ss.current_log;
	if (all_damage != 0) ss.last_dmg = all_damage;

	if (attack == '' && vboy == '') ss.kills = '';

/*	var kill_text = nick + ' убил';
	for (i = 0; i < div.length; i++)
	{
		div_a = div[i].getElementsByTagName('a');
		if (div_a.length == 2 && r_txt(div[i].textContent).match(kill_text))
		{
			if (in_events != 0 || in_towers != 0)
			{
				if (ss.kills.match(r_txt(div_a[1].textContent))) break;
				else ss.kills += '  » <span style="color:orange">' + r_txt(div_a[1].textContent) + '</span>';
			}
		}
	}*/
}
function searchPoint()
{
	switch (true)
	{
		case lvl > 0 && lvl < 8 && mark[5] != 1:
			click(kurgan, tmt, 1);
			break;
		case lvl > 2 && lvl < 14 && mark[5] != 1:
			search_point_lager_vikingov();
			break;
		case lvl > 8 && lvl < 19 && mark[5] != 1:
			search_point_delta_reki();
			break;
		case lvl > 13 && lvl < 25 && mark[5] != 1:
			search_point_lednik();
			break;
		case lvl > 19 && lvl < 33 && mark[5] != 1:
			search_point_severnaya_pustosh();
			break;
		case lvl > 30 && lvl < 41 && mark[5] != 1:
			search_point_rosengard();
			break;
		case lvl > 29 && lvl < 46 && mark[5] != 1:
			search_point_mg();
			break;
		case lvl > 39 && lvl < 51 && mark[5] != 1:
			search_point_zt();
			break;
		case lvl > 49 && lvl < 71 && mark[5] != 1:
			search_point_ds();
		default:
	}
}
function search_point_lager_vikingov()
{
	if (title.match(/Каракорум, столица Юга|Мидгард, столица Севера/))
	{
		click(lager_ordi, tmt, 1);
		click(lager_vikingov, tmt, 1);
	}
	if (title.match("Лагерь викингов")) click(lager_ordi, spt, 1);
	if (title.match("Лагерь орды")) click(lager_vikingov, spt, 1);
}
function search_point_delta_reki()
{
	if (title.match(/Каракорум, столица Юга|Мидгард, столица Севера/))
	{
		click(uste_reki, tmt, 1);
		click(delta_reki, tmt, 1);
	}

	var dr_rand = r_num(2);

	if (title.match("Дельта реки"))
	{
		if (!storona)
		{
			if (dr_rand == 0 && next_tower) click(leviy_bereg, spt, 1);
			else if (next_tower) click(praviu_bereg, spt, 1);
		}
		else
		{
			if (dr_rand == 0) click(leviy_bereg, spt, 1);
			else click(praviu_bereg, spt, 1);
		}
	}
	if (title.match("Левый берег"))
	{
		if (!storona)
		{
			if (dr_rand == 0 && next_tower) click(uste_reki, spt, 1);
			else click(dr_rand, spt, 1);
		}
		else
		{
			if (dr_rand == 0 && next_tower) click(dr_rand, spt, 1);
			else click(uste_reki, spt, 1);
		}
	}
	if (title.match("Правый берег"))
	{
		if (!storona)
		{
			if (dr_rand == 0 && next_tower) click(uste_reki, spt, 1);
			else click(dr_rand, spt, 1);
		}
		else
		{
			if (dr_rand == 0 && next_tower) click(dr_rand, spt, 1);
			else click(uste_reki, spt, 1);
		}
	}
	if (title.match("Устье реки"))
	{
		if (!storona)
		{
			if (dr_rand == 0) click(leviy_bereg, spt, 1);
			else click(praviu_bereg, spt, 1);
		}
		else
		{
			if (dr_rand == 0 && next_tower) click(leviy_bereg, spt, 1);
			else if (next_tower) click(praviu_bereg, spt, 1);
		}
	}
}
function search_point_lednik()
{
	if (title.match(/Каракорум, столица Юга|Мидгард, столица Севера/))
	{
		click(gornoe_ozero, tmt, 1);
		click(lednik, tmt, 1);
	}

	var lednik_rand = r_num(3);

	if (title.match("Ледник"))
	{
		if (!storona)
		{
			if (next_tower && lednik_rand < 2) click(ledyanie_pesheri, spt, 1);
			else if (next_tower) click(verhniu_pereval, spt, 1);
		}
		else
		{
			if (lednik_rand < 2) click(ledyanie_pesheri, spt, 1);
			else click(verhniu_pereval, spt, 1);
		}
	}
	if (title.match("Ледяные пещеры"))
	{
		if (!storona)
		{
			if (next_tower && lednik_rand < 1) click(kamennie_pesheri, spt, 1);
			else if (next_tower && lednik_rand < 3) click(nijniu_pereval, spt, 1);
			else click(lednik, spt, 1);
		}
		else
		{
			if (next_tower && lednik_rand == 0) click(lednik, spt, 1);
			else if (lednik_rand == 1) click(nijniu_pereval, spt, 1);
			else click(kamennie_pesheri, spt, 1);
		}
	}
	if (title.match("Каменные пещеры"))
	{
		if (!storona)
		{
			if (lednik_rand == 0) click(ledyanie_pesheri, spt, 1);
			else if (next_tower && lednik_rand == 1) click(gornoe_ozero, spt, 1);
			else click(verhniu_pereval, spt, 1);
		}
		else
		{
			if (next_tower && lednik_rand == 0) click(ledyanie_pesheri, spt, 1);
			else if (next_tower && lednik_rand == 1) click(verhniu_pereval, spt, 1);
			else click(gornoe_ozero, spt, 1);
		}
	}
	if (title.match("Верхний перевал"))
	{
		if (!storona)
		{
			if (next_tower && lednik_rand == 0) click(nijniu_pereval, spt, 1);
			else if (next_tower && lednik_rand == 1) click(kamennie_pesheri, spt, 1);
			else click(lednik, spt, 1);
		}
		else
		{
			if (next_tower && lednik_rand == 0) click(lednik, spt, 1);
			else if (lednik_rand == 1) click(kamennie_pesheri, spt, 1);
			else click(nijniu_pereval, spt, 1);
		}
	}
	if (title.match("Нижний перевал"))
	{
		if (!storona)
		{
			if (next_tower && lednik_rand == 0) click(gornoe_ozero, spt, 1);
			else if (lednik_rand == 1) click(verhniu_pereval, spt, 1);
			else click(ledyanie_pesheri, spt, 1);
		}
		else
		{
			if (next_tower && lednik_rand == 0) click(ledyanie_pesheri, spt, 1);
			else if (next_tower && lednik_rand == 1) click(verhniu_pereval, spt, 1);
			else click(gornoe_ozero, spt, 1);
		}
	}
	if (title.match("Горное озеро"))
	{
		if (!storona)
		{
			if (lednik_rand < 2) click(kamennie_pesheri, spt, 1);
			else click(nijniu_pereval, spt, 1);
		}
		else
		{
			if (next_tower && lednik_rand < 2) click(kamennie_pesheri, spt, 1);
			else if (next_tower) click(nijniu_pereval, spt, 1);
		}
	}
}
function search_point_severnaya_pustosh()
{
	if (title.match(/Каракорум, столица Юга|Мидгард, столица Севера/))
	{
		click(u_pustosh, tmt, 1);
		click(s_pustosh, tmt, 1);
	}

	var sp_rand = r_num(4);

	if (title.match("Северная пустошь"))
	{
		if (!storona)
		{
			if (next_tower && sp_rand < 2) click(sz_pustosh, spt, 1);
			else if (next_tower) click(sv_pustosh, spt, 1);
		}
		else
		{
			if (sp_rand < 2) click(sz_pustosh, spt, 1);
			else click(sv_pustosh, spt, 1);
		}
	}
	if (title.match("Северо-восточная пустошь"))
	{
		if (!storona)
		{
			if (next_tower && sp_rand == 0) click(v_pustosh, spt, 1);
			else if (next_tower && sp_rand == 1) click(perekrestok, spt, 1);
			else click(s_pustosh, spt, 1);
		}
		else
		{
			if (next_tower && sp_rand == 0) click(s_pustosh, spt, 1);
			else if (sp_rand == 1) click(perekrestok, spt, 1);
			else click(v_pustosh, spt, 1);
		}
	}
	if (title.match("Восточная пустошь"))
	{
		if (!storona)
		{
			if (next_tower && sp_rand < 2) click(uv_pustosh, spt, 1);
			else click(sv_pustosh, spt, 1);
		}
		else
		{
			if (next_tower && sp_rand < 2) click(sv_pustosh, spt, 1);
			else click(uv_pustosh, spt, 1);
		}
	}
	if (title.match("Юго-восточная пустошь"))
	{
		if (!storona)
		{
			if (next_tower && sp_rand == 0) click(u_pustosh, spt, 1);
			else if (sp_rand == 1) click(perekrestok, spt, 1);
			else click(v_pustosh, spt, 1);
		}
		else
		{
			if (next_tower && sp_rand == 0) click(v_pustosh, spt, 1);
			else if (next_tower && sp_rand == 1) click(perekrestok, spt, 1);
			else click(u_pustosh, spt, 1);
		}
	}
	if (title.match("Перекрёсток"))
	{
		if (!storona)
		{
			if (next_tower && sp_rand == 0) click(uv_pustosh, spt, 1);
			else if (next_tower && sp_rand == 1) click(uz_pustosh, spt, 1);
			else if (sp_rand == 2) click(sv_pustosh, spt, 1);
			else click(sz_pustosh, spt, 1);
		}
		else
		{
			if (next_tower && sp_rand == 0) click(sz_pustosh, spt, 1);
			else if (next_tower && sp_rand == 1) click(sv_pustosh, spt, 1);
			else if (sp_rand == 2) click(uz_pustosh, spt, 1);
			else click(uv_pustosh, spt, 1);
		}
	}
	if (title.match("Северо-западная пустошь"))
	{
		if (!storona)
		{
			if (next_tower && sp_rand == 0) click(z_pustosh, spt, 1);
			else if (next_tower && sp_rand == 1) click(perekrestok, spt, 1);
			else click(s_pustosh, spt, 1);
		}
		else
		{
			if (next_tower && sp_rand == 0) click(s_pustosh, spt, 1);
			else if (sp_rand == 1) click(perekrestok, spt, 1);
			else click(z_pustosh, spt, 1);
		}
	}
	if (title.match("Западная пустошь"))
	{
		if (!storona)
		{
			if (next_tower && sp_rand < 2) click(uz_pustosh, spt, 1);
			else click(sz_pustosh, spt, 1);
		}
		else
		{
			if (next_tower && sp_rand < 2) click(sz_pustosh, spt, 1);
			else click(uz_pustosh, spt, 1);
		}
	}
	if (title.match("Юго-западная пустошь"))
	{
		if (!storona)
		{
			if (next_tower && sp_rand == 0) click(u_pustosh, spt, 1);
			else if (sp_rand == 2) click(perekrestok, spt, 1);
			else click(z_pustosh, spt, 1);

		}
		else
		{
			if (next_tower && sp_rand == 0) click(z_pustosh, spt, 1);
			else if (next_tower && sp_rand == 1) click(perekrestok, spt, 1);
			else click(u_pustosh, spt, 1);
		}
	}
	if (title.match("Южная пустошь"))
	{
		if (!storona)
		{
			if (sp_rand < 2) click(uz_pustosh, spt, 1);
			else click(uv_pustosh, spt, 1);
		}
		else
		{
			if (next_tower && sp_rand < 2) click(uz_pustosh, spt, 1);
			else if (next_tower) click(uv_pustosh, spt, 1);
		}
	}
}
function search_point_rosengard()
{
	if (title.match(/Каракорум, столица Юга|Мидгард, столица Севера/))
	{
		click(marokand, tmt, 1);
		click(rosengard, tmt, 1);
	}

	var rosn_rand = r_num(4);

	if (title.match("Мароканд"))
	{
		if (!storona)
		{
			if (rosn_rand < 2) click(v_marokand, spt, 1);
			else click(z_marokand, spt, 1);
		}
		else
		{
			if (next_tower && rosn_rand < 2) click(v_marokand, spt, 1);
			else if (next_tower) click(z_marokand, spt, 1);
		}
	}
	if (title.match("Восточный Мароканд"))
	{
		if (!storona)
		{
			if (next_tower && rosn_rand < 2) click(marokand, spt, 1);
			else click(b_kurgan, spt, 1);
		}
		else
		{
			if (next_tower && rosn_rand < 2) click(b_kurgan, spt, 1);
			else click(marokand, spt, 1);
		}
	}
	if (title.match("Западный Мароканд"))
	{
		if (!storona)
		{
			if (next_tower && rosn_rand < 2) click(marokand, spt, 1);
			else click(b_kurgan, spt, 1);
		}
		else
		{
			if (next_tower && rosn_rand < 2) click(b_kurgan, spt, 1);
			else click(marokand, spt, 1);
		}
	}
	if (title.match("Западный Розенгард"))
	{
		if (!storona)
		{
			if (next_tower && rosn_rand < 2) click(b_kurgan, spt, 1);
			else click(rosengard, spt, 1);
		}
		else
		{
			if (next_tower && rosn_rand < 2) click(rosengard, spt, 1);
			else click(b_kurgan, spt, 1);
		}
	}
	if (title.match("Восточный Розенгард"))
	{
		if (!storona)
		{
			if (next_tower && rosn_rand < 2) click(b_kurgan, spt, 1);
			else click(rosengard, spt, 1);
		}
		else
		{
			if (next_tower && rosn_rand < 2) click(rosengard, spt, 1);
			else click(b_kurgan, spt, 1);
		}
	}
	if (title.match("Розенгард"))
	{
		if (!storona)
		{
			if (next_tower && rosn_rand < 2) click(z_rosengard, spt, 1);
			else if (next_tower) click(v_rosengard, spt, 1);
		}
		else
		{
			if (next_tower && rosn_rand < 2) click(z_rosengard, spt, 1);
			else click(v_rosengard, spt, 1);
		}
	}
	if (title.match("Большой курган"))
	{
		if (!storona)
		{
			if (next_tower && rosn_rand == 0) click(z_marokand, spt, 1);
			else if (next_tower && rosn_rand == 1) click(v_marokand, spt, 1);
			else if (rosn_rand == 2) click(z_rosengard, spt, 1);
			else click(v_rosengard, spt, 1);

		}
		else
		{
			if (next_tower && rosn_rand == 0) click(z_rosengard, spt, 1);
			else if (next_tower && rosn_rand == 1) click(v_rosengard, spt, 1);
			else if (rosn_rand == 2) click(z_marokand, spt, 1);
			else click(v_marokand, spt, 1);
		}
	}
}
function search_point_mg()
{
	if (title.match(/Каракорум, столица Юга|Мидгард, столица Севера/))
	{
		click(mgu, tmt, 1);
		click(mgs, tmt, 1);
	}

	var mg_rand = r_num(4);

	if (title.match("Мертвый город, Юг"))
	{
		if (!storona)
		{
			if (mg_rand == 0) click(uzo, spt, 1);
			else if (mg_rand == 1) click(hz, spt, 1);
			else if (mg_rand == 2) click(ho, spt, 1);
			else click(uvo, spt, 1);
		}
		else
		{
			if (next_tower && mg_rand == 0) click(uzo, spt, 1);
			else if (next_tower && mg_rand == 1) click(hz, spt, 1);
			else if (next_tower && mg_rand == 2) click(ho, spt, 1);
			else if (next_tower) click(uvo, spt, 1);
		}
	}
	if (title.match("Юго-западная окраина"))
	{
		if (!storona)
		{
			if (next_tower && mg_rand < 3) click(mgu, spt, 1);
			else click(pz, spt, 1);
		}
		else
		{
			if (next_tower && mg_rand < 3) click(pz, spt, 1);
			else click(mgu, spt, 1);
		}
	}
	if (title.match("Храм огня"))
	{
		if (!storona)
		{
			if (mg_rand < 2) click(pz, spt, 1);
			else if (next_tower && mg_rand < 4) click(mgu, spt, 1);
			else click(pv, spt, 1);
		}
		else
		{
			if (next_tower && mg_rand < 2) click(pz, spt, 1);
			else if (next_tower && mg_rand < 4) click(pv, spt, 1);
			else click(mgu, spt, 1);
		}
	}
	if (title.match("Храм земли"))
	{
		if (!storona)
		{
			if (mg_rand < 2) click(pv, spt, 1);
			else if (next_tower && mg_rand < 4) click(mgu, spt, 1);
			else click(pr, spt, 1);
		}
		else
		{
			if (next_tower && mg_rand < 2) click(pv, spt, 1);
			else if (next_tower && mg_rand < 4) click(pr, spt, 1);
			else click(mgu, spt, 1);
		}
	}
	if (title.match("Юго-восточная окраина"))
	{
		if (!storona)
		{
			if (next_tower && mg_rand < 3) click(mgu, spt, 1);
			else click(pr, spt, 1);
		}
		else
		{
			if (next_tower && mg_rand < 3) click(pr, spt, 1);
			else click(mgu, spt, 1);
		}
	}
	if (title.match("Площадь заката"))
	{
		if (!storona)
		{
			if (next_tower && mg_rand == 0) click(uzo, spt, 1);
			else if (next_tower && mg_rand == 1) click(ho, spt, 1);
			else if (mg_rand == 2) click(szo, spt, 1);
			else click(hn, spt, 1);
		}
		else
		{
			if (next_tower && mg_rand == 0) click(szo, spt, 1);
			else if (next_tower && mg_rand == 1) click(hn, spt, 1);
			else if (mg_rand == 2) click(uzo, spt, 1);
			else click(ho, spt, 1);
		}
	}
	if (title.match("Площадь восстания"))
	{
		if (!storona)
		{
			if (next_tower && mg_rand == 0) click(hz, spt, 1);
			else if (next_tower && mg_rand == 1) click(ho, spt, 1);
			else if (mg_rand == 2) click(hn, spt, 1);
			else click(hv, spt, 1);
		}
		else
		{
			if (next_tower && mg_rand == 0) click(hn, spt, 1);
			else if (next_tower && mg_rand == 1) click(hv, spt, 1);
			else if (mg_rand == 2) click(hz, spt, 1);
			else click(ho, spt, 1);
		}
	}
	if (title.match("Площадь рассвета"))
	{
		if (!storona)
		{
			if (next_tower && mg_rand == 0) click(hz, spt, 1);
			else if (next_tower && mg_rand == 1) click(uvo, spt, 1);
			else if (mg_rand == 2) click(hv, spt, 1);
			else click(svo, spt, 1);
		}
		else
		{
			if (next_tower && mg_rand == 0) click(hv, spt, 1);
			else if (next_tower && mg_rand == 1) click(svo, spt, 1);
			else if (mg_rand == 2) click(hz, spt, 1);
			else click(uvo, spt, 1);
		}
	}
	if (title.match("Северо-западная окраина"))
	{
		if (!storona)
		{
			if (next_tower && mg_rand < 2) click(pz, spt, 1);
			else click(mgs, spt, 1);
		}
		else
		{
			if (next_tower && mg_rand < 2) click(mgs, spt, 1);
			else click(pz, spt, 1);
		}
	}
	if (title.match("Храм неба"))
	{
		if (!storona)
		{
			if (next_tower && mg_rand < 2) click(pz, spt, 1);
			else if (next_tower && mg_rand == 2) click(pv, spt, 1);
			else click(mgs, spt, 1);
		}
		else
		{
			if (next_tower && mg_rand < 2) click(mgs, spt, 1);
			else if (mg_rand == 2) click(pv, spt, 1);
			else click(pz, spt, 1);
		}
	}
	if (title.match("Храм воды"))
	{
		if (!storona)
		{
			if (next_tower && mg_rand < 2) click(pv, spt, 1);
			else if (next_tower && mg_rand == 2) click(pr, spt, 1);
			else click(mgs, spt, 1);
		}
		else
		{
			if (next_tower && mg_rand < 2) click(mgs, spt, 1);
			else if (mg_rand == 2) click(pr, spt, 1);
			else click(pv, spt, 1);
		}
	}
	if (title.match("Северо-восточная окраина"))
	{
		if (!storona)
		{
			if (next_tower && mg_rand < 2) click(pr, spt, 1);
			else click(mgs, spt, 1);
		}
		else
		{
			if (next_tower && mg_rand < 2) click(mgs, spt, 1);
			else click(pr, spt, 1);
		}
	}
	if (title.match("Мертвый город, Север"))
	{
		if (!storona && next_tower)
		{
			if (mg_rand < 1) click(szo, spt, 1);
			else if (mg_rand < 2) click(hn, spt, 1);
			else if (mg_rand == 2) click(hv, spt, 1);
			else click(svo, spt, 1);
		}
		else
		{
			if (mg_rand == 0) click(szo, spt, 1);
			else if (mg_rand == 1) click(hn, spt, 1);
			else if (mg_rand == 2) click(hv, spt, 1);
			else click(svo, spt, 1);
		}
	}
}
function search_point_zt()
{
	if (title.match(/Каракорум, столица Юга|Мидгард, столица Севера/))
	{
		click(ztu, tmt, 1);
		click(zts, tmt, 1);
	}

	var zt_rand = r_num(4);

	if (title.match("Земли титанов, Север"))
	{
		if (!storona)
		{
			if (zt_rand < 2) click(szg, spt, 1);
			else click(svg, spt, 1);
		}
		else
		{
			if (zt_rand < 2) click(svg, spt, 1);
			else click(szg, spt, 1);
		}
	}
	if (title.match("Северо-западные горы"))
	{
		if (!storona)
		{
			if (next_tower && zt_rand < 1) click(kt, spt, 1);
			else if (next_tower && zt_rand == 2) click(zv, spt, 1);
			else click(zts, spt, 1);
		}
		else
		{
			if (next_tower && zt_rand < 1) click(zts, spt, 1);
			else if (zt_rand == 2) click(zv, spt, 1);
			else click(kt, spt, 1);
		}
	}
	if (title.match("Северо-восточные горы"))
	{
		if (!storona)
		{
			if (next_tower && zt_rand < 1) click(kt, spt, 1);
			else if (next_tower && zt_rand == 2) click(vv, spt, 1);
			else click(zts, spt, 1);
		}
		else
		{
			if (next_tower && zt_rand < 1) click(zts, spt, 1);
			else if (zt_rand == 2) click(vv, spt, 1);
			else click(kt, spt, 1);
		}
	}
	if (title.match("Западные врата"))
	{
		if (!storona)
		{
			if (next_tower && zt_rand < 2) click(uzg, spt, 1);
			else click(szg, spt, 1);
		}
		else
		{
			if (next_tower && zt_rand < 2) click(szg, spt, 1);
			else click(uzg, spt, 1);
		}
	}
	if (title.match("Крепость титанов"))
	{
		if (!storona)
		{
			if (next_tower && zt_rand < 1) click(uzg, spt, 1);
			else if (next_tower && zt_rand == 1) click(uvg, spt, 1);
			else if (zt_rand == 2) click(szg, spt, 1);
			else click(svg, spt, 1);
		}
		else
		{
			if (next_tower && zt_rand < 1) click(szg, spt, 1);
			else if (next_tower && zt_rand < 2) click(svg, spt, 1);
			else if (zt_rand == 2) click(uzg, spt, 1);
			else click(uvg, spt, 1);
		}
	}
	if (title.match("Восточные врата"))
	{
		if (!storona)
		{
			if (next_tower && zt_rand < 2) click(uvg, spt, 1);
			else click(svg, spt, 1);
		}
		else
		{
			if (next_tower && zt_rand < 2) click(svg, spt, 1);
			else click(uvg, spt, 1);
		}
	}
	if (title.match("Юго-западные горы"))
	{
		if (!storona)
		{
			if (next_tower && zt_rand < 2) click(ztu, spt, 1);
			else if (zt_rand == 2 || zt_rand == 3) click(kt, spt, 1);
			else click(zv, spt, 1);
		}
		else
		{
			if (next_tower && (zt_rand == 0 || zt_rand == 1)) click(zv, spt, 1);
			else if (next_tower && (zt_rand == 2 || zt_rand == 3)) click(kt, spt, 1);
			else click(ztu, spt, 1);
		}
	}
	if (title.match("Юго-восточные горы"))
	{
		if (!storona)
		{
			if (next_tower && zt_rand < 2) click(ztu, spt, 1);
			else if (zt_rand < 4) click(vv, spt, 1);
			else click(kt, spt, 1);
		}
		else
		{
			if (next_tower && zt_rand < 2) click(kt, spt, 1);
			else if (next_tower && zt_rand < 4) click(vv, spt, 1);
			else click(ztu, spt, 1);
		}
	}
	if (title.match("Земли титанов, Юг"))
	{
		if (!storona)
		{
			if (next_tower && zt_rand < 2) click(uvg, spt, 1);
			else if (next_tower) click(uzg, spt, 1);
		}
		else
		{
			if (next_tower && zt_rand < 2) click(uzg, spt, 1);
			else if (next_tower) click(uvg, spt, 1);
		}
	}
}
function search_point_ds()
{
	if (title.match(/Каракорум, столица Юга|Мидгард, столица Севера/))
	{
		click(dsu, tmt, 1);
		click(dss, tmt, 1);
	}

	var ds_rand = r_num(4);

	if (title.match("Долина Сражений, Север"))
	{
		if (!storona)
		{
			if (ds_rand < 2) click(szf, spt, 1);
			else click(svf, spt, 1);
		}
		else
		{
			if (ds_rand < 2) click(svf, spt, 1);
			else click(szf, spt, 1);
		}
	}
	if (title.match("Северо западный Форт"))
	{
		if (!storona)
		{
			if (next_tower && ds_rand < 1) click(pvb, spt, 1);
			else if (next_tower && ds_rand == 2) click(zk, spt, 1);
			else click(dss, spt, 1);
		}
		else
		{
			if (next_tower && ds_rand < 1) click(dss, spt, 1);
			else if (ds_rand == 2) click(zk, spt, 1);
			else click(pvb, spt, 1);
		}
	}
	if (title.match("Северо восточный Форт"))
	{
		if (!storona)
		{
			if (next_tower && ds_rand < 1) click(pvb, spt, 1);
			else if (next_tower && ds_rand == 2) click(vk, spt, 1);
			else click(dss, spt, 1);
		}
		else
		{
			if (next_tower && ds_rand < 1) click(dss, spt, 1);
			else if (ds_rand == 2) click(vk, spt, 1);
			else click(pvb, spt, 1);
		}
	}
	if (title.match("Западный Курган"))
	{
		if (!storona)
		{
			if (next_tower && ds_rand < 2) click(uzf, spt, 1);
			else click(szf, spt, 1);
		}
		else
		{
			if (next_tower && ds_rand < 2) click(szf, spt, 1);
			else click(uzf, spt, 1);
		}
	}
	if (title.match("Поле вечной битвы"))
	{
		if (!storona)
		{
			if (next_tower && ds_rand < 1) click(uzf, spt, 1);
			else if (next_tower && ds_rand == 1) click(uvf, spt, 1);
			else if (ds_rand == 2) click(szf, spt, 1);
			else click(svg, spt, 1);
		}
		else
		{
			if (next_tower && ds_rand < 1) click(szf, spt, 1);
			else if (next_tower && ds_rand < 2) click(svf, spt, 1);
			else if (ds_rand == 2) click(uzf, spt, 1);
			else click(uvf, spt, 1);
		}
	}
	if (title.match("Восточный Курган"))
	{
		if (!storona)
		{
			if (next_tower && ds_rand < 2) click(uvf, spt, 1);
			else click(svg, spt, 1);
		}
		else
		{
			if (next_tower && ds_rand < 2) click(svg, spt, 1);
			else click(uvf, spt, 1);
		}
	}
	if (title.match("Юго западный Форт"))
	{
		if (!storona)
		{
			if (next_tower && ds_rand < 2) click(dsu, spt, 1);
			else if (ds_rand == 2 || ds_rand == 3) click(pvb, spt, 1);
			else click(zk, spt, 1);
		}
		else
		{
			if (next_tower && (ds_rand == 0 || ds_rand == 1)) click(zk, spt, 1);
			else if (next_tower && (ds_rand == 2 || ds_rand == 3)) click(pvb, spt, 1);
			else click(dsu, spt, 1);
		}
	}
	if (title.match("Юго восточный Форт"))
	{
		if (!storona)
		{
			if (next_tower && ds_rand < 2) click(dsu, spt, 1);
			else if (ds_rand < 4) click(vk, spt, 1);
			else click(pvb, spt, 1);
		}
		else
		{
			if (next_tower && ds_rand < 2) click(pvb, spt, 1);
			else if (next_tower && ds_rand < 4) click(vk, spt, 1);
			else click(dsu, spt, 1);
		}
	}
	if (title.match("Долина Сражений, Юг"))
	{
		if (!storona)
		{
			if (next_tower && ds_rand < 2) click(uvf, spt, 1);
			else if (next_tower) click(uzf, spt, 1);
		}
		else
		{
			if (next_tower && ds_rand < 2) click(uzf, spt, 1);
			else if (next_tower) click(uvf, spt, 1);
		}
	}
}
function user_return()
{
	if (bonus[9] == 0)
	{
		var rand = Math.random() * 4;

		if (return_loc == 0 && title.match('Мой герой') && vboy == '') click(location.href, r_num(30000, 60000));
		else if (return_loc == 0 && title.match('Мой герой') && vboy != '') click(na_glavnuy, tmt);
		else if (return_loc == 0 && title.match('Варвары') && user != '') click(user, tmt);
		else if (title.match('Варвары') && return_loc == 1)
		{
			if (sets_ackiv[0] == 1 && ss.abilities[0] >= abil_num[0] && !ss.abilities.match(abil_num[0] + ','))
			{
				ss.set_abil = abil_num[0];
				ss.change_set += 'a';
				select_abil();

			}
			if (sets_ackiv[1] == 1 && ss.stances[0] >= stan_num[0] && !ss.stances.match(stan_num[0] + ','))
			{
				ss.set_stan = stan_num[0];
				ss.change_set += 's';
				select_stan();
			}
			if (sets_ackiv[2] == 1 && ss.body[0] >= body_num[0] && !ss.body.match(body_num[0] + ','))
			{
				ss.set_body = body_num[0];
				ss.change_set += 'b';
				select_body();
			}
			click(bashni, tmt);
		}
		if (title.match(/Каракорум, столица Юга|Мидгард, столица Севера/)) searchPoint();

		if (in_towers != 0)
		{
			if (tower_flee == 0)
			{
				if ((vrag_mech / drug) > krit_massa) searchPoint();
				if (krit_hp > uroven_hp && krit_hp != 0 && uroven_hp != 0 && heal_your_self == '') {next_tower = 0; searchPoint();}
				if (vrag <= enemy_min && attack_towers == '' && heal_your_self == '') searchPoint();
				if (massa > massa_max && krit_hp < uroven_hp && heal_your_self == '') {next_tower = 0; searchPoint();}
			}
			if (tower_flee == 1)
			{
				if ((vrag_mech / drug) > krit_massa) searchPoint();
				if (krit_hp > uroven_hp && krit_hp != 0 && uroven_hp != 0 && heal_your_self == '') click(na_glavnuy, spt);
				if (vrag <= enemy_min && attack_towers == '' && heal_your_self == '') searchPoint();
				if (massa > massa_max && krit_hp < uroven_hp && heal_your_self == '') click(na_glavnuy, spt);
			}
		}
	}
	else if (bonus[9] != 0)
	{
		if (title.match(/Поход/) && statistics != '') click(statistics, tmt);
		else if (title.match(/Варвары/) && journey != '')
		{
			if (sets_ackiv[0] == 1 && ss.abilities[0] >= abil_num[0] && !ss.abilities.match(abil_num[0] + ','))
			{
				ss.set_abil = abil_num[0];
				ss.change_set += 'a';
				select_abil();
			}
			else if (sets_ackiv[1] == 1 && ss.stances[0] >= stan_num[0] && !ss.stances.match(stan_num[0] + ','))
			{
				ss.set_stan = stan_num[0];
				ss.change_set += 's';
				select_stan();
			}
			else if (sets_ackiv[2] == 1 && ss.body[0] >= body_num[0] && !ss.body.match(body_num[0] + ','))
			{
				ss.set_body = body_num[0];
				ss.change_set += 'b';
				select_body();
			}
			else click(journey, tmt);
		}
		else if (in_towers != 0 && na_glavnuy != '') click(na_glavnuy, tmt);
	}
}
function select_event()
{
	var cdt = cdt_attack;
	if (in_events != 0) cdt = cdt_event;

	if (attack_strazh != '' && rus_t.match(/ (\d+)% (\d+)% (\d+):(\d+)/) && title.match(/Голова|Сердце|Гроза|Крепость|Исцеление|Зеркало|Источник|Колыбель/i))
	{
		var straj = / (\d+)% (\d+)% (\d+):(\d+)/.exec(rus_t);
		if (attack_vrag != '' && straj[2] > 4) attack_strazh = '';
	}
	if (energshit != '' && title.match(/Выживание|Арена/) && lowenergy) energshit = '';

	if (attack_dobivat != '')
	{
		if (in_events == 11 && attack_dobivat.innerHTML.match(/(red_|blue_)healer/) && hp_vraga < 10000) good_target = 1;
		if (title.match(/Территория/i) && ss.attack_terr == 0)
		{
			if (attack_dobivat.innerHTML.match(/(red_|blue_)healer/) && hp_vraga < 10000) good_target = 1;
			if (attack_dobivat.innerHTML.match(/(red_|blue_)warrior/)) good_target = 0;
		}
		if (title.match(/Территория/i) && ss.attack_terr == 1)
		{
			if (attack_dobivat.innerHTML.match(/blue_healer/) && hp_vraga < 10000) good_target = 1;
			if (attack_dobivat.innerHTML.match(/(red_|blue_)warrior|red_healer/)) good_target = 2;
		}
		if (title.match(/Территория/i) && ss.attack_terr == 2)
		{
			if (attack_dobivat.innerHTML.match(/red_healer/) && hp_vraga < 10000) good_target = 1;
			if (attack_dobivat.innerHTML.match(/(red_|blue_)warrior|blue_healer/)) good_target = 2;
		}

		target_name = r_txt(attack_dobivat.textContent).replace(/( {1,})?Добивать( {1,})?/, '').replace(/( {1,})?\((\d+)\)( {1,})?/, '');

		if ((set_white == 1 || set_white == 3) && in_towers != 0 && r_txt(white_list).match(target_name)) good_target = 2;
		if ((set_white == 2 || set_white == 3) && in_events != 0 && r_txt(white_list).match(target_name)) good_target = 2;
		if ((set_black == 1 || set_black == 3) && in_towers != 0 && r_txt(black_list).match(target_name)) good_target = 1;
		if ((set_black == 2 || set_black == 3) && in_events != 0 && r_txt(black_list).match(target_name)) good_target = 1;

		if (title.match('Битва героев') && rus_t.match('Цель: ' + target_name)) target = 1;
		if (title.match('Битва героев') && rus_t.match('Цель: -')) notarget = 1;

		if (nasmeshka != '' && attack_dobivat.innerHTML.match(/(red_|blue_)healer/) && in_towers != 0) {nasmeshka = ''; good_target = 2;}

		if (attack_dobivat.innerHTML.match(/lifealert/) && hp_vraga < (real_dmg * 5)) good_target = 1;
		if (title.match(/Врата|Стены|Храм|Площадь|Мифриловый Зал/) && hp_vraga > (real_dmg * 4)) good_target = 2;

		if (plar.length != 1 && title.match(/Арена/))
		{
			if (plar[3] != '-' && r_txt(plar[3]).match(target_name)) good_target = 1;
			else if (plar[3] != '-' && !r_txt(plar[3]).match(target_name)) good_target = 2;
			else if (plar[3] == '-' && plar[2] != '-' && r_txt(plar[2]).match(target_name)) good_target = 1;
			else if (plar[3] == '-' && plar[2] != '-' && !r_txt(plar[2]).match(target_name)) good_target = 2;
			else if (plar[3] == '-' && plar[2] == '-' && plar[1] != '-' && r_txt(plar[1]).match(target_name)) good_target = 1;
			else if (plar[3] == '-' && plar[2] == '-' && plar[1] != '-' && !r_txt(plar[1]).match(target_name)) good_target = 2;
		}
		if (plar.length != 1 && title.match(/Выживание/))
		{
			if (plar[4] != '-' && r_txt(plar[4]).match(target_name)) good_target = 1;
			else if (plar[4] != '-' && !r_txt(plar[4]).match(target_name)) good_target = 2;
			else if (plar[4] == '-' && plar[3] != '-' && r_txt(plar[3]).match(target_name)) good_target = 1;
			else if (plar[4] == '-' && plar[3] != '-' && !r_txt(plar[3]).match(target_name)) good_target = 2;
			else if (plar[4] == '-' && plar[3] == '-' && plar[2] != '-' && r_txt(plar[2]).match(target_name)) good_target = 1;
			else if (plar[4] == '-' && plar[3] == '-' && plar[2] != '-' && !r_txt(plar[2]).match(target_name)) good_target = 2;
			else if (plar[4] == '-' && plar[3] == '-' && plar[2] == '-' && plar[1] != '-' && r_txt(plar[1]).match(target_name)) good_target = 1;
			else if (plar[4] == '-' && plar[3] == '-' && plar[2] == '-' && plar[1] != '-' && !r_txt(plar[1]).match(target_name)) good_target = 2;
		}
		if (title.match(/Арена|Выживание/) && hp_vraga < (real_dmg * 2)) good_target = 1;
		if (rus_t.match(/руна/) && hp_vraga == 1) {good_target = 1; cdt = r_num(3000, 3200);}
	}
	if (return_loc == 4)
	{
		if (title.match(/Выживание/) && (rus_t.match(/через (\d+) сек/) || attack != '')) {mark[23] = 1; mark[24] = 0;}
		if (title.match(/Арена/) && (rus_t.match(/через (\d+) сек/) || attack != '')) {mark[24] = 1; mark[23] = 0;}
	}
	if (title.match(/\d\/(\d+) финала/)) good_target = 1;
	if (title.match(/Арена|тур|\d\/(\d+)/) && rus_t.match(/Наши: (\d) Враги: (\d) /))
	{
		var nashi = /Наши: (\d)/.exec(rus_t);
		var vragi = /Враги: (\d)/.exec(rus_t);

		if (vragi[1] == 1) good_target = 1;
		if (nashi[1] == 1 && vragi[1] == 1 && hp_vraga + 200 > uroven_hp && set_drink_b[0] == 4) set_drink_b[0] = 1;
	}
	if (title.match('Выживание') && rus_t.match(/ (\d) (\d+):(\d+)/))
	{
		var war = / (\d) (\d+):(\d+)/.exec(rus_t);
		if (war[1] == 2)
		{
			set_white = 0; good_target = 1;
			if (hp_vraga + 200 > uroven_hp && set_drink_b[1] == 4) set_drink_b[1] = 1;
		}
	}

	var rand = r_num(4);

	if (title.match("Поля сражений") && /56|57|58/.test(server_time[2])) obnovlenie = r_num(1000, 40000);

	if (activ_smeshka) cdt = 2500;
	if ((attack_gerod == '' || attack_kochev == '') && (heal_your_self != '' || (heal_soyznika != '' && heal_end) || (heal != '' && ((((rand > nekogo_lechit) || nekogo_lechit == 0) && set_heal_select == 1) || set_heal_select == 0 || destroy_mana == '')))) cdt = cdt_heal;
	if (ss.perehod == 1) cdt = r_num(300, 1000);

	if (damage != '' && hp_vraga != '' && Number(damage) > Number(hp_vraga)) cdt = r_num(1500, 2400);


	if (drink_hp != 0 && buttle != '' && (t_but < (cdt_def - 300)) && (drink_hp <= 2 && drink_hp * ss.last_dmg >= uroven_hp || drink_hp <= 200 && drink_hp * life >= uroven_hp  || drink_hp > 200 && drink_hp <= uroven_hp) && in_towers != 0) click(buttle, t_but + spt, 0);
	else if (drink_hp != 0 && set_drink_b[0] == 1 && buttle != '' && t_but < (cdt_def - 300) && (drink_hp <= 2 && drink_hp * ss.last_dmg >= uroven_hp || drink_hp <= 200 && drink_hp * life >= uroven_hp  || drink_hp > 200 && drink_hp <= uroven_hp) && in_events != 0 && title.match(/Арена/)) click(buttle, t_but + spt, 0);
	else if (drink_hp != 0 && set_drink_b[0] == 2 && buttle != '' && t_but < (cdt_def - 300) && (drink_hp <= 2 && drink_hp * ss.last_dmg >= uroven_hp || drink_hp <= 200 && drink_hp * life >= uroven_hp  || drink_hp > 200 && drink_hp <= uroven_hp) && in_events != 0 && title.match(/Арена/) && ss.arena_games < 51) click(buttle, t_but + spt, 0);
	else if (drink_hp != 0 && set_drink_b[0] == 3 && buttle != '' && t_but < (cdt_def - 300) && (drink_hp <= 2 && drink_hp * ss.last_dmg >= uroven_hp || drink_hp <= 200 && drink_hp * life >= uroven_hp  || drink_hp > 200 && drink_hp <= uroven_hp) && in_events != 0 && title.match(/Арена/) && ss.arena_games <= min_battle[0]) click(buttle, t_but + spt, 0);
	else if (drink_hp != 0 && set_drink_b[1] == 1 && buttle != '' && t_but < (cdt_def - 300) && (drink_hp <= 2 && drink_hp * ss.last_dmg >= uroven_hp || drink_hp <= 200 && drink_hp * life >= uroven_hp  || drink_hp > 200 && drink_hp <= uroven_hp) && in_events != 0 && title.match(/Выживание/)) click(buttle, t_but + spt, 0);
	else if (drink_hp != 0 && set_drink_b[1] == 2 && buttle != '' && t_but < (cdt_def - 300) && (drink_hp <= 2 && drink_hp * ss.last_dmg >= uroven_hp || drink_hp <= 200 && drink_hp * life >= uroven_hp  || drink_hp > 200 && drink_hp <= uroven_hp) && in_events != 0 && title.match(/Выживание/) && ss.surv_games < 51) click(buttle, t_but + spt, 0);
	else if (drink_hp != 0 && set_drink_b[1] == 3 && buttle != '' && t_but < (cdt_def - 300) && (drink_hp <= 2 && drink_hp * ss.last_dmg >= uroven_hp || drink_hp <= 200 && drink_hp * life >= uroven_hp  || drink_hp > 200 && drink_hp <= uroven_hp) && in_events != 0 && title.match(/Выживание/) && ss.surv_games <= min_battle[1]) click(buttle, t_but + spt, 0);
	else if (drink_hp != 0 && buttle != '' && t_but < (cdt_def - 300) && (drink_hp <= 2 && drink_hp * ss.last_dmg >= uroven_hp || drink_hp <= 200 && drink_hp * life >= uroven_hp  || drink_hp > 200 && drink_hp <= uroven_hp) && in_events != 0 && !title.match(/Арена|Выживание/)) click(buttle, t_but + spt, 0);
	else if (set_energ_low[0] == 1 && buttle != '' && t_but < (cdt_def - 300) && uroven_en <= 0 && in_events != 0 && in_towers != 0) click(buttle, t_but + spt, 0);
	else if (set_energ_low[2] == 1 && buttle != '' && t_but < (cdt_def - 300) && uroven_en <= 0 && in_events != 0 && title.match(/Арена/)) click(buttle, t_but + spt, 0);
	else if (set_energ_low[2] == 2 && buttle != '' && t_but < (cdt_def - 300) && uroven_en <= 0 && in_events != 0 && title.match(/Арена/) && ss.arena_games < 51) click(buttle, t_but + spt, 0);
	else if (set_energ_low[3] == 1 && buttle != '' && t_but < (cdt_def - 300) && uroven_en <= 0 && in_events != 0 && title.match(/Выживание/)) click(buttle, t_but + spt, 0);
	else if (set_energ_low[3] == 2 && buttle != '' && t_but < (cdt_def - 300) && uroven_en <= 0 && in_events != 0 && title.match(/Выживание/) && ss.surv_games < 51) click(buttle, t_but + spt, 0);
	else if (set_energ_low[4] == 1 && buttle != '' && t_but < (cdt_def - 300) && uroven_en <= 0 && in_events != 0 && title.match(/Арена|Выживание/)) click(buttle, t_but + spt, 0);
	else if (title.match(/Врата|Стены|Храм|Площадь|Мифриловый Зал/) && buttle != '' && (t_but < (cdt_def - 300))) click(buttle, t_but + spt, 0);
	else if (metal_shit != '' && uroven_hp < 10000 && set_metal_sh) click(metal_shit, tmt, 0);
	else if (uvorot != '' && activ_kamshit && (t_uvo < (cdt_def - 200)) && all_damage > 1000) if (t_uvo == '') click(uvorot, 1200 + spt, 0); else click(uvorot, t_uvo + spt, 0); // уворот при кам. щите, если урон више 1000
	else if (uvorot != '' && !activ_kamshit && (t_uvo < (cdt_def - 200)) && all_damage > 0 && (uvorot_hp == 1 || uvorot_hp != 1 && Number(uvorot_hp) >= uroven_hp)) if (t_uvo == '') click(uvorot, 1200 + spt, 0); else click(uvorot, t_uvo + spt, 0);
	else if (kamshit != '' && t_kam < (cdt_def - 200) && all_damage > 0 && (kam_shit_hp == 1 || kam_shit_hp != 1 && Number(kam_shit_hp) >= uroven_hp)) if (t_kam == '') click(kamshit, 1200 + spt, 0); else click(kamshit, t_kam + spt, 0);
	else if (shitotr != '' && (t_otr < (cdt_def - 200)) && all_damage > 0 && (otr_shit_hp == 1 || otr_shit_hp != 1 && Number(otr_shit_hp) >= uroven_hp)) if (t_otr == '') click(shitotr, 1200 + spt, 0); else click(shitotr, t_otr + spt, 0);
	else if (energshit != '' && (t_ener < (cdt_def - 200)) && all_damage > 0 && (en_shit_hp == 1 || en_shit_hp != 1 && Number(en_shit_hp) >= uroven_hp)) if (t_ener == '') click(energshit, 1200 + spt, 0); else click(energshit, t_ener + spt, 0);
	else if (berserk != '' && heal == '' && (t_bers < (cdt - 200))) click(berserk, cdt, 0);
	else if (berserk != '' && heal == '' && (t_bers < (cdt - 200))) click(berserk, cdt, 0);
	else if (pronikaushii != '' && heal == '' && (t_pron < (cdt - 200))) click(pronikaushii, cdt, 0);
	else if (kritomania != '' && (t_krit < (cdt - 200))) click(kritomania, cdt, 0);
	else if (metka != '' && (t_met < (cdt - 200))) click(metka, cdt, 0);
	else if (dobivat_kochev != '' && (hp_kocev < 15000)) click(dobivat_kochev, cdt, 0);
	else if (attack_kochev != '') click(attack_kochev, cdt, 0);
	//	else if (attack_czar!='') click(attack_czar, cdt, 0);
	else if (attack_gerod != '') click(attack_gerod, cdt, 0);
	else if (attack_strazh != '') click(attack_strazh, cdt, 0);
	else if (nasmeshka != '' && (t_nasm < (cdt - 200)) && (Number(vrag_mech) > Number(drug_med))) click(nasmeshka, cdt, 0);
	else if (heal_your_self != '' && krit_hp > uroven_hp && krit_hp != 0 && uroven_hp != 0 && !activ_smeshka) click(heal_your_self, (cdt / 1.5));
	else if (heal_your_self != '' && !activ_smeshka) click(heal_your_self, cdt);
	else if (heal_soyznika != '' && heal_end && !activ_smeshka) click(heal_soyznika, cdt, 0);
	else if (heal != '' && !activ_smeshka && (((rand > nekogo_lechit || nekogo_lechit == 0) && set_heal_select == 1) || set_heal_select == 0 || destroy_mana == '')) click(heal, cdt, 0);
	else if (destroy_mana != '')
	{
		if (berserk != '' && (t_bers < (cdt - 200))) click(berserk, cdt, 0);
		else if (destroy_man != '' && activ_smeshka) click(destroy_man, cdt, 0);
		else if (destroy_man != '' && r_num(4) < 1 && good_target != 2) click(destroy_man, cdt, 0);
		else click(destroy_mana, cdt, 0);
	}
	else if (obnovit != '' && title.match("Чат клана") && ss.to_chat == 1) click(obnovit, cdt_stop, 1);
	else if (attack_dobivat != '' && target) click(attack_dobivat, cdt, 0);
	else if (attack_vrag != '' && title.match('Битва героев') && !target && !notarget) click(attack_vrag, cdt, 0);
	else if (attack_towers != '' && (set_attack_tower == 2 || storona && title.match("Северная Крепость") || !storona && title.match("Южный Порт"))) click(attack_towers, cdt, 0);
	else if (attack_towers != '' && set_attack_tower == 1 && !title.match('Битва героев') && ((hp_bashni / drug_mech) > r_num(800, 2000))) click(attack_towers, cdt, 0);
	else if (attack_dobivat != '' && (good_target != 2 && ((in_events == 0 && r_num(4) < 2) || good_target == 1 || (in_events != 0 && !title.match(/Логово Геррода|Территория|Битва героев|Цари Горы/i))))) click(attack_dobivat, cdt, 0);
	else if (in_events == 12 && attack == '' && attack_dobivat != '') click(attack_dobivat, cdt, 0);
	else if (in_events == 12 && attack != '') click(attack, cdt, 0);
	else if (attack_vrag != '') click(attack_vrag, cdt, 0);
	else if (attack_vrata != '') click(attack_vrata, cdt, 0);
	else if (noviu_boy != '') {click(noviu_boy, tmt, 1); mark[27]++; ss.missed++;}
	else if (vbitvu != '') click(vbitvu, tmt, 1);
	else if (vernutsa != '' && in_events != 0) click(vernutsa, tmt, 1);
	else if (na_glavnuy != '' && (vstat_v_ochered != '' && pokinut_ochered == '' || obnovit == '') && mark[27] > 1) {click(na_glavnuy, cdt, 0); mark[27] = 0;}
	else if (vstat_v_ochered != '') {click(vstat_v_ochered, tmt, 1); mark[27]++; ss.missed++;}
	else if (obnovit != '' && title != "Чат клана") {click(obnovit, obnovlenie, 1); mark[27] = 0;}
	else if (attack_towers != '') click(attack_towers, cdt, 0);
}
function user_check()
{
	if (in_events == 0 && boss == 0)
	{
		if (title.match('Мой герой'))
		{
			if (captcha == '')
			{
				ss.missed = 0;
				ss.removeItem('ATT');
			}
			if (ss.ATT == 1) vboy = '';
			if (captcha != '' && vboy == '')
			{
				ss.ATT = 1;
				click(captcha, tmt);
			}
			if (captcha != '')
			{
				ss.ATT = 1;
				click(user, tmt);
			//	click(na_glavnuy, tmt);
			}

		}
		else if (title.match('Варвары') && user != '' && ss.ATT == 1) click(user, tmt);

		if (Number(ss.missed) > 3 && (!title.match(/Мой герой|защита от ботов!/) || !/user($|\/check)/.test(a[i].href)) && user != '') click(user, tmt);

		if (set_ustal && title.match(/Мой герой|Усталость/i) && /(\d+):(\d+)/.test(tire_max) && /(\d+):(\d+)/.test(tire_min))
		{
			var t_max = /(\d+):(\d+)/.exec(tire_max);
			var utt_max = t_max[1] * 3600 + t_max[2] * 60;
			var t_min = /(\d+):(\d+)/.exec(tire_min);
			var utt_min = t_min[1] * 3600 + t_min[2] * 60;
			if (utt_max >= time_serv && utt_min <= time_serv)
			{
				if (ustalost != '' && mark[11] != 1 && title.match('Мой герой') && mark[16] == 0) click(ustalost, tmt);
				if (snyat_ustalost != '' && title.match(/Усталость/i))
				{
					mark[16] = comp_time + r_num(300, 1000);
					click(snyat_ustalost, tmt);
				}
			}
		}
	}
	if (title.match("Варвары") && /Поход \((\d+):(\d+):(\d+)\)/.test(rus_t))
	{
		var reg = /Поход \((\d+):(\d+):(\d+)\)/;
		if (reg.test(rus_t)) bonus[9] = get_sec(f_time.exec(reg.exec(rus_t))) + comp_time;
	}
}
function udacha_()
{
	if (new_day) ss.udacha = 0;

	if (title.match(/Колодец удачи/i))
	{
		if (rus_t.match(/Сегодня ты уже получил подарок/i))
		{
			ss.udacha = 1;
			click(na_glavnuy, tmt);
		}
		if (ss.udacha != 1 && well_udacha == 2 && prof_podarok != '')
		{
			ss.udacha = 1;
			click(prof_podarok, tmt);
		}
		else if (ss.udacha != 1 && well_udacha == 1 && podarok != '')
		{
			ss.udacha = 1;
			click(podarok, tmt);
		}
		else if (ss.udacha != 1 && well_udacha == 2 && prof_podarok == '')
		{
			ss.udacha = 1;
			click(podarok, tmt);
		}
		else if (ss.udacha == 1) click(na_glavnuy, tmt);
	}
	if (title.match(/Варвары/i) && ss.udacha == 0 && well != '') click(well, tmt);
	else if (ss.udacha == 0 && boss == 0 && (in_events == 0 || (title.match(/Арена|Выживание/) && pokinut_ochered == '' && (noviu_boy != '' || vstat_v_ochered != '' || rus_t.match("Ваш герой погиб, ждите окончания боя")))) && vboy == '') click(na_glavnuy, tmt);

}
function bugs()
{
	if (resurection != '')
	{
		if (time_res < obnovlenie) click(resurection, time_res + spt);
		else click(resurection, obnovlenie);
	}
	if (skrit != '' && set_skrivat) click(skrit, spt, 1);
	if (otklonit != '' && set_otklonyat) click(otklonit, spt, 1);
	if (title.match(/Арена|Выживание|Колодец удачи/) && v_rukzak != '') click(v_rukzak, spt, 1);
	if (take != '' && set_quests) click(take, spt, 1);
	else if (quest != '' && set_quests && !title.match(/Мой герой|задания/) && rus_t.match(/Мой герой \(\+\)/)) click(quest, spt, 1);
	else if (quest != '' && set_quests && title.match(/Мой герой/) && rus_t.match(/Задания \(\+\)/)) click(quest, spt, 1);
	else if (title.match('Слишком быстро') && rus_t.match(/Вы попытались загрузить более/i) && nazad != '') click(nazad, tmt);
	else if (title.match(/Ошибка/i) && rus_t.match(/Произошла какая-то ошибка/i) && user != '') click(user, tmt);

	if (ss.user == undefined) click(user, tmt);

	if (ss.max_alt != undefined && ss.lvl_alt != undefined) if (ss.max_alt == ss.lvl_alt) good_alt = 1;

	if (title.match(/Арена|Выживание/i) && rus_t.match(/мои игры на (арене|выживание): \d+\/\d+/i))
	{
		var arn_txt = /мои игры на арене: \d+\/\d+/i;
		var sur_txt = /мои игры на выживание: \d+\/\d+/i;

		if (rus_t.match(arn_txt)) ss.arena_games = parseInt(/(\d+)\//.exec(rus_t.match(arn_txt)));
		if (rus_t.match(sur_txt)) ss.surv_games = parseInt(/(\d+)\//.exec(rus_t.match(sur_txt)));
		if (rus_t.match("Ваш герой погиб, ждите окончания боя") && title.match(/Арена/i)) ss.arena_games++;
		if (rus_t.match("Ваш герой погиб, ждите окончания боя") && title.match(/Выживание/i)) ss.surv_games++;
	}
	if (title.match(/Варвары/) && rus_t.match(/Арена \(\+\)/) && ss.arena_games >= 5) ss.removeItem('arena_games');
	if (title.match(/Варвары/) && rus_t.match(/Выживание \(\+\)/) && ss.surv_games >= 5) ss.removeItem('surv_games');

	for (var i = 0; i < document.getElementsByClassName('feedbackPanelERROR').length; i++)
	{
		var feedback = r_txt(document.getElementsByClassName('feedbackPanelERROR')[i].textContent);
		if (feedback.match('У Вас не хватает денег')) mark[10] = comp_time + r_num(1000, 5000);
		if (feedback.match('У Вас не хватает железа')) mark[11] = comp_time + r_num(1000, 5000);
		if (feedback.match('В сундуке нет места')) mark[7] = 1;
		if (feedback.match(/Сюда можно только с|Для входа необходим/))
		{
			click(user, tmt);
			mark[5] = 1;
		}
		if (feedback.match('Переодеваться в бою нельзя') && vboy != '') click(vboy, tmt, 1);
	}
	for (var i = 0; i < document.getElementsByClassName('notify').length; i++)
	{
		var notify = r_txt(document.getElementsByClassName('notify')[i].textContent);
		if (title.match('Поля сражений') && attack == '' && notify.match('Бои на полях сражений доступны')) {mark[4] = 1; click(na_glavnuy, tmt);}
		if (title.match('Арена') && attack == '' && notify.match('Бои на арене доступны')) click(na_glavnuy, tmt);
	}
	for (var i = 0; i < document.getElementsByClassName('admin').length; i++)
	{
		var adm = r_txt(document.getElementsByClassName('admin')[i].textContent);
		if (adm.match('Финальная битва')) terr_blue = 1;
	}
	var b_i = document.getElementsByTagName('b');
	for (i = 0; i < b_i.length; i++) if (b_i[i].style.color.match(/rgb\(111, 205, 114\)|6fcd72/) && b_i[i].textContent.match('Битва претендентов|Финальная битва')) terr_green = 1;

	for (var i = 0; i < document.getElementsByClassName('info').length; i++)
	{
		var inf = r_txt(document.getElementsByClassName('info')[i].textContent);
		if (inf.match('Битва претендентов')) terr_green = 1;
		if (inf.match('Твой уровень стал слишком высок для этой Башни'))
		{
			ss.removeItem('user');
			if (ksu != '') click(ksu, tmt);
			else if (mss != '') click(mss, tmt);
			else click(na_glavnuy, tmt);
		}
	}
	for (var i = 0; i < document.getElementsByClassName('major').length; i++)
	{
		major = r_txt(document.getElementsByClassName('major')[i].textContent);
		if (major.match(/Стены замка разрушены|входа в замок больше нет/) && attack == '' && heal == '') click(na_glavnuy, tmt);
	}
	if (in_events != 0 && rus_t.match(/через(: | )(\d+):(\d+):(\d+)/) && !rus_t.match(/но команда продолжает биться/) && attack == '' && heal == '')
	{
		var vremya_bitvi = /через(: | )(\d+):(\d+):(\d+)/.exec(rus_t);
		if (vremya_bitvi[2] == 0 && vremya_bitvi[3] == 0 && obnovlenie > (vremya_bitvi[4] * 1000) && obnovit != '') obnovlenie = (vremya_bitvi[3] * 1000) + spt;

		if (in_events != 0 && attack == '' && heal == '' && rus_t.match(/Битва завершилась!/i) && (Number(vremya_bitvi[1]) > 0 || Number(vremya_bitvi[2]) > 15)) click(na_glavnuy, tmt);
		if (((Number(vremya_bitvi[2]) != 0 || Number(vremya_bitvi[3]) > 6) && vremya_bitvi[4] <= 55) && in_events == 11 && !rus_t.match(/Вы получили/) && ss.buff < 10)
		{
			obnovlenie = (15000) + spt;
			ss.buff++;
		}
		else if ((Number(vremya_bitvi[2]) != 0 || Number(vremya_bitvi[3]) > 6) && vremya_bitvi[4] <= 55)
		{
			click(na_glavnuy, tmt);
			ss.buff = 0;
		}
		else if (ss.to_boss > 4 && ss.to_boss < 13 && !title.match(/Территория/)) click(na_glavnuy, tmt);
	}
	else if (in_events != 0 && rus_t.match(/через: (\d+):(\d+)/) && attack == '' && heal == '')
	{
		var vremya_bitvi = /через: (\d+):(\d+)/.exec(rus_t);
		if (vremya_bitvi[1] == 0 && obnovlenie > (vremya_bitvi[2] * 1000) && obnovit != '') obnovlenie = (vremya_bitvi[2] * 1000) + spt;
	}
	else if (in_events != 0 && rus_t.match(/через (\d+) сек/))
	{
		var cherez = (/через (\d+) сек/.exec(rus_t))[1];
		if (obnovlenie > (cherez * 1000)) obnovlenie = (cherez * 1000) + spt;
	}

	if (Number(ss.arena_games) < min_battle[0] && Number(ss.surv_games) < min_battle[1] && mark[17] == 0 && mark[18] == 0 && lvl >= 30) return_loc = 4;
	else if (Number(ss.arena_games) < min_battle[0] && mark[18] == 0 && lvl >= 25) return_loc = 3;
	else if (Number(ss.surv_games) < min_battle[1] && mark[17] == 0 && lvl >= 30) return_loc = 2;

	if (rus_t.match(/Вы бились храбро, но погибли/) && title.match(/Цари Горы/i)) click(na_glavnuy, tmt);
	else if (rus_t.match(/Вы бились храбро, но погибли|Битва началась, Логово закрыто/) && title.match("Логово Геррода")) click(na_glavnuy, tmt);
	else if ((title.match(/Выживание/) && mark[23] == 1 && mark[24] != 0 || title.match(/Арена/) && mark[24] == 1 && mark[23] != 0) && (attack == '' && !rus_t.match(/через(: | )(\d+)/) && pokinut_ochered == '' && (noviu_boy != '' || vstat_v_ochered != '' || rus_t.match("Ваш герой погиб, ждите окончания боя")))) click(na_glavnuy, tmt);
	else if ((title.match(/Арена/) && return_loc != 3 && mark[18] == 0 && mark[17] == 0 || title.match(/Выживание/) && return_loc != 2 && mark[17] == 0 && mark[18] == 0) && attack == '' && return_loc != 4 && !rus_t.match(/через(: | )(\d+)/)) click(na_glavnuy, tmt);
	else if (title.match(/Арена|Выживание/) && pokinut_ochered == '' && (noviu_boy != '' || vstat_v_ochered != '' || rus_t.match("Твой герой погиб, ждите окончания боя")) && return_loc >= 0 && return_loc <= 1 || in_towers != 0 && return_loc == 0) click(na_glavnuy, tmt);
	else if (title.match(/Территория/) && rus_t.match(/Битва претендентов/) && terr_green != 1) click(na_glavnuy, tmt);
	else if (title.match(/Территория/) && rus_t.match(/Финальная битва/) && terr_blue != 1 && terr_green != 1) click(na_glavnuy, tmt);
	else if (title.match(/Территория/) && rus_t.match(/Финальная битва/) && terr_blue == 1) ss.attack_terr = 0;
	else if (title.match(/Битва героев|турнир/i) && attack == '' && rus_t.match(/Для участия в (турнире|Битве героев) необходимо получить/i)) {mark[8] = 1; click(na_glavnuy, tmt);}
	else if (in_events != 0 && attack == '' && heal == '' && rus_t.match(/Твой герой погиб, ждите окончания боя|Битва началась, Вы не успели|Битва завершилась/i) && !title.match(/Арена|Выживание/i) && !rus_t.match(/через(: | )(\d+)/)) click(na_glavnuy, tmt);
	else if (in_events != 0 && attack == '' && heal == '' && rus_t.match(/Твой герой погиб и выбывает из турнира|Ваша команда погибла и выбывает из турнира|Турнир завершился|Турнир уже начался/)) click(na_glavnuy, tmt);
	else if (in_events == 12 && attack == '' && rus_t.match(/\[на главную\]/)) click(na_glavnuy, tmt);

	if (title.match(/Территория/i) && u_class == "медик") set_heal_select = 0;

	if (rus_t.match(/Вход на поля для вас закрыт/)) mark[4] = 1;
	if (title.match("Вход закрыт") && rus_t.match(/Твой герой сбежал с поля боя. Вход на арену временно закрыт./) && mark[17] == 0) mark[17] = comp_time + 1800;
	if (title.match("Арена") && !rus_t.match(/Твой герой сбежал с поля боя. Вход на арену временно закрыт./)) mark[17] = 0;
	if (title.match("Вход закрыт") && rus_t.match(/Твой герой сбежал с поля боя. Вход на выживание временно закрыт./) && mark[18] == 0) mark[18] = comp_time + 1800;
	if (title.match("Выживание") && !rus_t.match(/Твой герой сбежал с поля боя. Вход на выживание временно закрыт./)) mark[18] = 0;

	if (title.match(/Каменный тролль|Святилище предков|Дракон (\d+) ур/i) && rus_t.match(/(\d+)% ?(\d+)% ?(\d+) ?(\d+) ?(\d+):(\d+)/))
	{
		var tr_info = /(\d+)% ?(\d+)% ?(\d+) ?(\d+) ?(\d+):(\d+)/.exec(rus_t);
		var tr_energ = Number(tr_info[2]);
		if (tr_energ > (tr_shit * 2)) mark[21] = 2;
		else if (tr_energ > tr_shit) mark[21] = 1;
		else if (tr_energ < tr_shit) mark[21] = 0;
	}
	else mark[21] = 0;

	if (title.match(/Потерянный Легион/i) && !rus_t.match(/Вход закрыт/))
	{
		var bron_num = '';

		lgt_bron = rus_t.match(/\d+% \d+% \d+/i);
		lgt_bron = lgt_bron.toString();
		bron_num = lgt_bron.split(' ');
		lgn_shit = parseInt(bron_num[1]);

		for (var i = 0; i < img.length; i++)
		{
			if (/cent/.test(img[i].src) && /rip/.test(img[i + 1].src) && /cent/.test(img[i + 2].src) && /rip/.test(img[i + 3].src)) ss.legion = 3;
			// Марк и антоний убиты
			else if (/cent/.test(img[i].src) && /cent/.test(img[i + 1].src) && /rip/.test(img[i + 2].src)) ss.legion = 2;
			// марк живой, антоний нет
			else if (/cent/.test(img[i].src) && /rip/.test(img[i + 1].src) && /cent/.test(img[i + 2].src)) ss.legion = 1;
			// макр убит, антоний нет
			else if (/cent/.test(img[i].src) && /cent/.test(img[i + 1].src) && !/rip/.test(img[i + 2].src)) ss.legion = 4;
			// оба центуриона живы
		}
	}
}
function other_return()
{
	if (openbag != '' && !title.match("Моё снаряжение") && !in_towers != 0 && in_events == 0 && boss == 0) click(openbag, tmt);
	if (!action)
	{
		mark[6] = 0;
		mark[7] = 0;

		if (vboy != '') click(vboy, spt, 1);
		else if (in_events != 0 || boss) click(location.href, 5000);
		else if (in_events == 0 && boss == 0 && na_glavnuy != '' || err_d == 1) click(na_glavnuy, tmt);
		else click('/user', 2000);
	}
}
function auto_login()
{
	if (autologin==1 && username != '' && password != '')
	{
		if (rus_t.match(/Неверный ник или пароль/)) alert('Неверный ник или пароль');
		if (title.match('Варвары') && vhod != '') click(vhod, tmt);
		if (location.href.match(location.host + '/authorization')) click(vhod, tmt);
		if (location.href.match(location.host + '/login'))
		{
			document.all.login.value = username;
			document.all.password.value = password;

			action = 1; setTimeout(function() {document.forms[0].submit()}, obnovlenie);
		}
	}
	else if (location.href.match(location.host + '/authorization') && na_glavnuy != '') click(na_glavnuy, 60000);
}
function obrabotka_otveta(response)
{
	if (response.match(/error/i))
	{
		if (response.match(/ERROR_ZERO_BALANCE/i)) alert('Недастаточно средств на балансе ANTIGATE');
		document.all.code.value = '';
		setTimeout(function() {location.href = location.href}, tmt);
	}
	else
	{
		document.all.code.value = response.toLowerCase();
		action = true;
		setTimeout(function() {document.forms[0].submit()}, obnovlenie);
	}
}
function dnd_event()
{
	var cdt = cdt_boos_a;

	if (attack_dobivat != '' || attack_soul != '') {}
	else if (heal_your_self != '' || (heal_target != '' && ss.dheal == 1) || (heal != '' && (destroy_mana_boss == '' || ss.dheal == 0 || ss.dheal == undefined || (ss.dheal == 2 && mark[21] == 0)))) cdt = cdt_boos_h;

	if (set_krit_bers && heal == '')
	{
		if (/Берсерк \((\d+)сек/.test(rus_t))
		{
			var brs_not = /Берсерк \((\d+)сек/.exec(rus_t);
			if (brs_not[1] < 14 && 2 * t_bers > cdt) kritomania = '';
		}
		if (/Критомания \((\d+)сек/.test(rus_t))
		{
			var krt_not = /Критомания \((\d+)сек/.exec(rus_t);
			if (krt_not[1] < 14 && 2 * t_krit > cdt) berserk = '';
		}
	}
	if (drink_hp != 0 && buttle != '' && t_but < (cdt - 300) && (drink_hp <= 2 && drink_hp * ss.last_dmg >= uroven_hp || drink_hp <= 200 && drink_hp * life >= uroven_hp  || drink_hp > 200 && drink_hp <= uroven_hp)) click(buttle, t_but + spt, 0);
	else if (set_energ_low[1] == 1 && buttle != '' && t_but < (cdt - 300) && uroven_en <= 0) click(buttle, t_but + spt, 0);
	else if (vstat_v_ochered != '') click(vstat_v_ochered, tmt, 1);
	else if (obnovit != '' && title.match("Чат клана") && ss.to_chat == 1) click(obnovit, cdt_stop, 1);
	else if (ready != '') click(ready, tmt, 1);
	else if (obnovit != '' && title != "Чат клана" && attack == '' && heal == '') click(obnovit, obnovlenie, 1);
	else if (attack_soul != '' && (attack_dobivat == '' || ss.atk == 1 && zod_soul == '')) click(attack_soul, (cdt * 0.5), 0);
	// Быстрый поиск души, если в слове больше 4-ех букв, кулдаун в два раза меньше
	else if (attack_legion != '' && lgn_shit <= 10) click(attack, 1000, 0);
	// Если броня легата уже ниже 10%, то легионеров не трогать
	else if (attack_antoniy != '' && (lgn_shit > 10 && ss.atk == 0 || ss.atk == 1)) click(attack, 1000, 0);
	// Если антония надо убивать и бронь легата выше 10% - искать легонеров
	else if (attack_mark != '' && (ss.legion != 2 && ss.atk == 0 || ss.atk == 1)) click(attack, 1000, 0);
	// если антоний жив и надо убить обоих искать антония или легата если центурионов не убивать
	else if (attack_legat != '' && ((lgn_shit > 10 || ss.legion != 3) && ss.atk == 0 || lgn_shit > 10 && ss.atk == 1)) click(attack, 1000, 0);
	// если бронь выше 10% или не убиты марк и антоний не бить легата

	else if (berserk != '' && (heal == '' && mark[21] != 2 || heal != '' && mark[21] == 2 && dmg_text != 2 || dmg_text == 1 && mark[21] != 0 || ss.dheal == 1) && (t_bers < (cdt - 200))) click(berserk, cdt, 0);
	// не включать берс, если персонаж-воин и бронь большая
	// включать и при начале боя медом
	// если мед жжог енергию и не хватило жжения, то сдудуйщий удар с берсом
	else if (kritomania != '' && (heal == '' && mark[21] != 2 || heal != '') && (t_krit < (cdt - 200))) click(kritomania, cdt, 0);
	// не включать критоманию, если персонаж-воин и бронь большая
	else if (kamshit != '' && (t_kam < (cdt - 200)) && ((title.match("Храм Немезиды") && (Number(hp_c) + Number(hp_g) + Number(hp_n)) < nem_kam) || !title.match("Храм Немезиды"))) click(kamshit, cdt, 0);
	// не включать щит на немезиде, если общее хп больше чем в настройках
	else if (ss.atk == 1 && zod_soul != '') click(zod_soul, cdt, 0);
	// бить душу зодиака если меньше 4-ех букв
	else if (heal_your_self != '') click(heal_your_self, cdt);
	else if (heal_target != '' && ss.dheal == 1) click(heal_target, cdt);
	// лечить цель на велах
	else if (destroy_mana_boss != '' && mark[21] != 0 && ss.dheal == 2)
	{
		if (berserk != '' && dmg_text == 1 && t_bers < (cdt - 200)) click(berserk, cdt, 0);
		else click(destroy_mana_boss, cdt, 0);
	}
	else if (heal_soyznika != '' && heal_end) click(heal_soyznika, cdt, 0);
	else if (heal != '' && (destroy_mana_boss == '' || ss.dheal == 0 || ss.dheal == undefined || (ss.dheal == 2 && mark[21] == 0))) click(heal, cdt, 0);
	else if (destroy_mana_boss != '')
	{
		if (berserk != '' && t_bers < (cdt - 200)) click(berserk, cdt, 0);
		else click(destroy_mana_boss, cdt, 0);
	}
	else if (attack_dobivat != '') click(attack_dobivat, cdt, 0);
	else if (attack_strazh != '') click(attack_strazh, cdt, 0);
	else if (attack_aello != '') click(attack_aello, cdt, 0);
	else if (attack_ozonenu != '') click(attack_ozonenu, cdt, 0);
	else if (minotavr != '') click(minotavr, cdt, 0);
	else if (minotavr != '') click(minotavr, cdt, 0);
	else if (manticora != '') click(manticora, cdt, 0);
	else if (attack_drakon != '') click(attack_drakon, cdt, 0);

	else if (yapiter != '' && (ss.atk == 1 || epiter == '')) click(yapiter, cdt, 0);
	else if (epiter != '' && (ss.atk == 2 || yapiter == '')) click(epiter, cdt, 0);
	else if (yapiter != '' && (hp_ya > hp_yap || epiter == '')) click(yapiter, cdt, 0);
	else if (epiter != '') click(epiter, cdt, 0);

	else if (attack_troll != '') click(attack_troll, cdt, 0);
	else if (attack_bers != '') click(attack_bers, cdt, 0);

	else if (ss.atk == 3 && nemezida != '') click(nemezida, cdt, 0);
	else if (ss.atk == 1 && garm != '') click(garm, cdt, 0);
	else if (ss.atk == 2 && cerber != '') click(cerber, cdt, 0);
	// бить гарма,цербера или немку
	else if (ss.atk == 0 && cerber != '' && hp_c > hp_n && hp_c >= hp_g) click(cerber, cdt, 0);
	else if (ss.atk == 0 && garm != '' && hp_g > hp_n && hp_g >= hp_c) click(garm, cdt, 0);
	else if (ss.atk == 0 && nemezida != '' && hp_n >= hp_g && hp_n >= hp_c) click(nemezida, cdt, 0);
	// у кого больше хп, того и бить

	else if (garm != '' && hp_g > hp_garm) click(garm, cdt, 0);
	// бить гарма, если хп больше чем надо
	else if (cerber != '' && hp_c > hp_cerb) click(cerber, cdt, 0);
	// бить цербера, если хп больше чем надо
	else if (nemezida != '' && hp_n > hp_nema) click(nemezida, cdt, 0);
	// бить немку, если хп больше чем надо
	else if (garm != '' && hp_g > hp_n && hp_g >= hp_c) click(garm, cdt, 0);
	// бить гарма, если хп гарма больше чем немки и цербера
	else if (cerber != '' && hp_c > hp_n && hp_c >= hp_g) click(cerber, cdt, 0);
	// бить цербера, если хп цербера больше чем немки и гарма
	else if (nemezida != '' && hp_n >= hp_g && hp_n >= hp_c) click(nemezida, cdt, 0);
	// бить немку, если хп немки больше чем гарма и цербера

	else if (garm != '') click(garm, cdt, 0);
	else if (cerber != '') click(cerber, cdt, 0);
	else if (nemezida != '') click(nemezida, cdt, 0);

	else if (attack_legion != '' && lgn_shit > 10) click(attack_legion, cdt, 0);
	else if (attack_mark != '' && lgn_shit <= 10 && ss.legion == 2 && ss.atk == 0) click(attack_mark, cdt, 0);
	else if (attack_antoniy != '' && lgn_shit <= 10 && ss.atk == 0) click(attack_antoniy, cdt, 0);
	else if (attack_legat != '' && lgn_shit <= 10 && (ss.legion == 3 && ss.atk == 0 || ss.atk == 1)) click(attack_legat, cdt, 0);

	else if (zodiak != '') click(zodiak, cdt, 0);
	else if (attack_dobivat != '') click(attack_dobivat, cdt, 0);
	else if (attack_soul != '') click(attack_soul, cdt, 0);

	else if (attack != '') click(attack, cdt, 0);
	else if (heal_soyznika != '') click(heal_soyznika, cdt, 0);
}
function mpage(val, site)
{
	if (site == 1)
	{
		var span_i = document.createElement("span");
		span_i.innerHTML += "<span class='minor'>" + val + "</span>";
		if (document.body.getElementsByTagName("td")[0] != undefined) document.body.getElementsByTagName("td")[0].appendChild(span_i);
	}
	else if (site == 0)
	{

		var div_i = document.createElement("div");
		div_i.innerHTML = "<div class='small minor'>" + val + "</div>" + div_i.innerHTML;
		document.body.appendChild(div_i);
	}
}
function gett(val, t)
{
	var sek = Number(val) - comp_time;
	var hr = Math.floor(sek / 3600);
	var mnt = Math.floor((sek - hr * 3600) / 60);
	var scnd = Math.floor(sek - (hr * 3600 + mnt * 60));
	if (hr < 10) hr = '0' + hr;
	if (mnt < 10) mnt = '0' + mnt;
	if (scnd < 10) scnd = '0' + scnd;
	if (t == 1) return hr;
	else if (t == 2) return mnt;
	else if (t == 3) return scnd;
	else if (t == 4) return sek;
}
function add_info()
{
//	info_button += '<div class="hr"></div>';
	info += '<div class="hr"></div>';

	var div_b = '';

	if (tray_status != '' && ss.ATT == 1 && !unravel) div_b = ' [<span id="timer" style="color:orange">' + (tray_status / 1000).toFixed(1) + '</span>|Captcha]';
	else if (tray_status != '' && ss.ATT != 1) div_b = ' [<span id="timer" style="color:orange">' + (tray_status / 1000).toFixed(1) + '</span>|' + (tray_status / 1000).toFixed(1) + ']';
	else if (tray_status != '' && ss.ATT == 1 && unravel) div_b = ' [<span id="timer" style="color:orange">' + (tray_status / 1000).toFixed(1) + '</span>|Antigate]';

	if (title.match(/Территория/i) && u_class == "воин")
	{
		if (ss.attack_terr == undefined) ss.attack_terr = 0;
		if (ss.attack_terr == 0) div_b += ' <b><a class="minor" id="t_link" style="text-decoration:none; color:yellow" href="javascript://">Бью медов</a></b>';
		if (ss.attack_terr == 1) div_b += ' <b><a class="minor" id="t_link" style="text-decoration:none; color:yellow" href="javascript://">Синих медов</a></b>';
		if (ss.attack_terr == 2) div_b += ' <b><a class="minor" id="t_link" style="text-decoration:none; color:yellow" href="javascript://">Красных медов</a></b>';
	}
	else ss.removeItem('attack_terr');

	if (title.match(/Каменный тролль|Святилище предков|Дракон (\d+) ур/i) && u_class == "медик")
	{
		if (ss.dheal == undefined) ss.dheal = troll_ev;
		if (ss.dheal == 0) div_b += ' <b><a class="minor" id="h_link" style="text-decoration:none; color:yellow" href="javascript://">Лечу</a></b>';
		if (ss.dheal == 1) div_b += ' <b><a class="minor" id="h_link" style="text-decoration:none; color:yellow" href="javascript://">Жгу энку</a></b>';
		if (ss.dheal == 2) div_b += ' <b><a class="minor" id="h_link" style="text-decoration:none; color:yellow" href="javascript://">Лечу и жгу</a></b>';
	}
	else if (title.match(/Долина великанов/i) && u_class == "медик")
	{
		if (ss.dheal == undefined || ss.dheal > 1) ss.dheal = 0;
		if (ss.dheal == 0) div_b += ' <b><a class="minor" id="h_link" style="text-decoration:none; color:yellow" href="javascript://">Лечу</a></b>';
		if (ss.dheal == 1) div_b += ' <b><a class="minor" id="h_link" style="text-decoration:none; color:yellow" href="javascript://">Лечу цель</a></b>';
	}
	else if (in_events != 0 || in_towers != 0) ss.removeItem('dheal');

	if (title.match(/Долина великанов/i) && u_class == "воин")
	{
		if (ss.atk == undefined) ss.atk = 0;

		if (ss.atk == 0) div_b += ' <b><a class="minor" id="w_link" style="text-decoration:none; color:yellow" href="javascript://">Яп.Эп</a></b>';
		if (ss.atk == 1) div_b += ' <b><a class="minor" id="w_link" style="text-decoration:none; color:yellow" href="javascript://">Бью Япитера</a></b>';
		if (ss.atk == 2) div_b += ' <b><a class="minor" id="w_link" style="text-decoration:none; color:yellow" href="javascript://">Бью Эпитера</a></b>';
	}
	else if (title.match(/Храм Немезиды/i) && u_class == "воин")
	{
		if (ss.atk == undefined) ss.atk = nemka_ev;
		if (ss.atk == 0) div_b += ' <b><a class="minor" id="w_link" style="text-decoration:none; color:yellow" href="javascript://">ХП+</a></b>';
		if (ss.atk == 1) div_b += ' <b><a class="minor" id="w_link" style="text-decoration:none; color:yellow" href="javascript://">Бью Гарма</a></b>';
		if (ss.atk == 2) div_b += ' <b><a class="minor" id="w_link" style="text-decoration:none; color:yellow" href="javascript://">Бью Цербера</a></b>';
		if (ss.atk == 3) div_b += ' <b><a class="minor" id="w_link" style="text-decoration:none; color:yellow" href="javascript://">Бью Немезиду</a></b>';
		if (ss.atk == 4) div_b += ' <b><a class="minor" id="w_link" style="text-decoration:none; color:yellow" href="javascript://">Гарм.Ц+Н</a></b>';
	}
	else if (title.match(/Обитель Зодиака/i) && u_class == "воин")
	{
		if (ss.atk == undefined) ss.atk = zod_ev;
		if (ss.atk == 0) div_b += ' <b><a class="minor" id="w_link" style="text-decoration:none; color:gray" href="javascript://">До 4-х букв</a></b>';
		if (ss.atk == 1) div_b += ' <b><a class="minor" id="w_link" style="text-decoration:none; color:yellow" href="javascript://">До 4-х букв</a></b>';
	}
	else if (title.match(/Потерянный Легион/i) && u_class == "воин")
	{
		if (ss.atk == undefined) ss.atk = leg_ev;
		if (ss.atk == 0) div_b += ' <b><a class="minor" id="w_link" style="text-decoration:none; color:yellow" href="javascript://">Ант.М+Л</a></b>';
		if (ss.atk == 1) div_b += ' <b><a class="minor" id="w_link" style="text-decoration:none; color:yellow" href="javascript://">Только Легата</a></b>';
	}
	else if (in_events != 0 || in_towers != 0) ss.removeItem('atk');
/*
	if (title.match(/Арена/) && ss.plar.match(/.,./)) for (var i = 3; i >= 0; i--) if (plar[i] != '-')
	{
		div_b = '  » <span style="color:yellow"><b>' + plar[i] + '</b></span> ' + rtngs[i] + '';
		break;
	}
	if (title.match(/Выживание/) && ss.plar.match(/.,./)) for (var i = 4; i >= 0; i--) if (plar[i] != '-')
	{
		div_b = '  » <span style="color:yellow"><b>' + plar[i] + '</b></span> ' + rtngs[i] + '';
		break;
	}
*/
	if (ls.on_off == "on" && ss.nick != undefined) info_button += '<span> <b><a class="minor" id="on_off" style="text-decoration:none; color:orange; display:inline" href="javascript://">' + ss.nick + '</a></b>' + div_b + '</span>';
	else if (ls.on_off == "on") info_button += '<span> <b><a class="minor" id="on_off" style="text-decoration:none; color:orange; display:inline" href="javascript://">Выкл.Js</a></b>' + div_b + '</span>';
	else if (ss.nick != undefined) info_button += '<span> <b><a class="minor" id="on_off" style="text-decoration:none; color:gray" href="javascript://">' + ss.nick + '</a></b>' + div_b + '</span>';
	else info_button += '<span> <b><a class="minor" id="on_off" style="text-decoration:none; color:gray" href="javascript://">Вкл.Js</a></b>' + div_b + '</span>';
//	info_button += '<div class="hr"></div>';



	if (ls.on_off == "on")
	{
		//info += '<div class="hr"></div>';
	//	if (ss.nick != undefined && ss.guild != undefined) {info += '<div><b><span style="color:orange"> ' + ss.guild + '</span></b> » <b><span style="color:orange">' + ss.nick + '</span></b></div>'; info += '<div class="hr"></div>';}
	//	else if (ss.nick != undefined) {info += '<div> Персонаж » <b><span style="color:orange">' + ss.nick + '</span></b></div>'; info += '<div class="hr"></div>';}

		if (ss.territory != undefined) info += '<div> <span style="color:orange">Территория</span> </span>:<span style="color:orange"> ' + terra_name[Number(ss.territory) - 1] + '</span></div>';

//		if (tray_status != '' && ss.ATT == 1 && !unravel) info += '<div> <span style="color:orange">Ожидание</span>: <span id="timer" style="color:orange">' + (tray_status / 60000).toFixed(1) + '</span> мин</div>';
//		else if (tray_status != '' && ss.ATT != 1) info += '<div> <span style="color:orange">Ожидание</span>: <span id="timer" style="color:orange">' + (tray_status / 1000).toFixed(1) + '</span> сек</div>';
//		else if (tray_status != '' && ss.ATT == 1 && unravel) info += '<div> <span style="color:orange">Antigate</span>: <span id="timer" style="color:orange">' + (tray_status / 1000).toFixed(1) + '</span> сек</div>';

		if (bonus[9] != 0 && !title.match(/Поход/)) info += '<div> <span style="color:orange">Поход</span>: <span style="color:orange">' + gett(bonus[9], 1) + '<span style="color:gray"> ч.</span> ' + gett(bonus[9], 2) + '<span style="color:gray"> мин.</span></span></div>';

		if (bonus[8] != 0 && (bonus[8] - comp_time) >= 900 && ss.lvl_alt != undefined) info += '<div> <span style="color:orange">Алтарь</span> <span style="color:orange">+' + ss.lvl_alt + '%</span> | <span style="color:orange">' + gett(bonus[8], 1) +'</span>:<span style="color:orange">' + gett(bonus[8], 2) + '</span></div>';
		else if (bonus[8] != 0 && (bonus[8] - comp_time) >= 300 && ss.lvl_alt != undefined) info += '<div> <span style="color:orange">Алтарь</span> <span style="color:yellow">+' + ss.lvl_alt + '%</span> | <span style="color:yellow">' + gett(bonus[8], 1) +'</span>:<span style="color:yellow">' + gett(bonus[8], 2) + '</span></div>';
		else if (bonus[8] != 0 && ss.lvl_alt != undefined) info += '<div> <span style="color:orange">Алтарь</span> <span style="color:gray">+' + ss.lvl_alt + '%</span> | <span style="color:gray">' + gett(bonus[8], 1) +'</span>:<span style="color:gray">' + gett(bonus[8], 2) + '</span></div>';
		else info += '<div> <span style="color:orange">Алтарь</span> : нет</div>';

//		if (ss.arena_games != undefined && ss.arena_games != 0 || ss.surv_games != undefined && ss.surv_games != 0) info += '<div class="hr"></div>';
		if (ss.arena_games != undefined && ss.arena_games != 0) info += '<div> <span style="color:orange">Бои Арены</span>: <span style="color:orange">' + ss.arena_games + '</span></div>';
		if (ss.surv_games != undefined && ss.surv_games != 0) info += '<div> <span style="color:orange">Бои Выживания</span>: <span style="color:orange">' + ss.surv_games + '</span></div>';

		if (!title.match(/Арена|Выживание/) && mark[17] != 0 && mark[18] != 0 && mark[17] <= mark[18]) info += '<div class="hr"></div><div> <span style="color:orange">Возврат на PVP</span>:</span> <span style="color:orange">' + gett(mark[17], 2) + '</span></div>';
		if (!title.match(/Арена|Выживание/) && mark[17] != 0 && mark[18] != 0 && mark[18] <= mark[17]) info += '<div class="hr"></div><div> <span style="color:orange">Возврат на PVP</span>:</span> <span style="color:orange">' + gett(mark[18], 2) + '</span> мин</div>';

		if ((set_citadel[0] != 0 && cita[0] != 0) || (set_citadel[1] != 0 && cita[1] != 0) || (set_citadel[2] != 0 && cita[2] != 0) && moderate)
		{
			info += '<div class="hr"></div>';
			info += '<div> Цитадель сейчас</span> </span> [<span style="color:orange">активирована</span>]</div>';
		}
		else if ((set_citadel[0] != 0 || set_citadel[1] != 0 || set_citadel[2] != 0))
		{
			info += '<div class="hr"></div>';
			info += '<div> Цитадель могут активировать</span> </span> [<span style="color:orange">лидер и генералы</span>]</div>';
		}
	info += '<div class="hr"></div>';
	}

/*	if (ss.kills == undefined || ss.kills != '')
	{
		info += '» <span style="color:orange">Убил </span>' + ss.kills;
		info += '<div class="hr"></div>';
	}*/

	if (ss.setngs.match(ss.nick) && ss.nick != undefined) info += '<div> <span style="color:orange">Индивидуальная настройка скрипта</span></div>';
	else if (ss.nick != undefined) info += '<div> <span style="color:orange">Скрипт использует настройки по-умолчанию</span></div>';


	if (document.body.getElementsByTagName("td")[0] != undefined) mpage(info_button, 1);
	else
	{
		info_button = '<div class="hr"></div>' + info_button;
		mpage(info_button, 0);
	}
	mpage(info, 0);
	mpage("PEEEEEEEEEEEEE", 2);

	var t = setInterval(my_timer, 57);

	if (document.getElementById("on_off") != undefined) on_off.onclick = function()
	{
		if (ls.on_off == "on") {ls.on_off = "off"; on_off.style = "text-decoration:none; color:gray"; if (tmt_id != "") clearTimeout(tmt_id); activ_link.style.color = "";  if (ss.nick != '') on_off.textContent = ss.nick; else on_off.textContent = "Вкл.Js";}
		else {ls.on_off = "on"; on_off.style = "text-decoration:none; color:orange"; ss.perehod = 1; if (ss.nick != '') on_off.textContent = ss.nick; else on_off.textContent = "Выкл.Js"; location.href = location.href;}
	}
	if (document.getElementById("t_link") != undefined) t_link.onclick = function()
	{
		if (title.match(/Территория/i) && u_class == "воин")
		{
			if (ss.attack_terr == 0) {ss.attack_terr = 1; t_link.textContent = "Синих медов";}
			else if (ss.attack_terr == 1) {ss.attack_terr = 2;t_link.textContent = "Красных медов";}
			else {ss.attack_terr = 0; t_link.textContent = "Бью медов";}
		}
	}
	if (document.getElementById("h_link") != undefined) h_link.onclick = function()
	{
		if (title.match(/Долина великанов/i))
		{
			if (ss.dheal == 0) {ss.dheal = 1; h_link.textContent = "Лечу цель";}
			else {ss.dheal = 0; h_link.textContent = "Лечу";}
		}
		else if (title.match(/Каменный тролль|Святилище предков|Дракон (\d+) ур/i))
		{
			if (ss.dheal == 0) {ss.dheal = 1; h_link.textContent = "Жгу энку";}
			else if (ss.dheal == 1) {ss.dheal = 2; h_link.textContent = "Лечу и жгу";}
			else {ss.dheal = 0; h_link.textContent = "Лечу";}
		}
	}
	if (document.getElementById("w_link") != undefined) w_link.onclick = function()
	{
		if (title.match(/Храм Немезиды/i))
		{
			if (ss.atk == 0) {ss.atk = 1; w_link.textContent = "Бью Гарма";}
			else if (ss.atk == 1) {ss.atk = 2; w_link.textContent = "Бью Цербера";}
			else if (ss.atk == 2) {ss.atk = 3; w_link.textContent = "Бью Немезиду";}
			else if (ss.atk == 3) {ss.atk = 4; w_link.textContent = "Гарм.Ц+Н";}
			else {ss.atk = 0; w_link.textContent = " ХП+";}
		}
		else if (title.match(/Долина великанов/i))
		{
			if (ss.atk == 0) {ss.atk = 1; w_link.textContent = "Бью Япитера";}
			else if (ss.atk == 1) {ss.atk = 2; w_link.textContent = "Бью Эпитера";}
			else {ss.atk = 0; w_link.textContent = "Яп.Эп";}
		}
		else if (title.match(/Обитель Зодиака/i))
		{
			if (ss.atk == 0) {ss.atk = 1; w_link.style = "text-decoration:none; color:yellow";}
			else {ss.atk = 0; w_link.style = "text-decoration:none; color:gray";}
		}
		else if (title.match(/Потерянный легион/i))
		{
			if (ss.atk == 0) {ss.atk = 1; w_link.textContent = "Только Легата";}
			else {ss.atk = 0; w_link.textContent = "Ант.М+Л";}
		}
	}
}
function my_timer()
{
	if (document.getElementById("timer") != undefined)
	{
		t2 = +new Date();
		tmr = t1 + Number(tray_status) - t2;
		if (tmr < 60)
		{
			document.getElementById("timer").innerHTML = "0.0";
			clearInterval(t);
		}
		else if (ss.ATT == 1 && title.match(/защита от ботов!/) && !unravel)
		{
			document.getElementById("timer").innerHTML = (tmr / 60000).toFixed(1);
		}
		else document.getElementById("timer").innerHTML = (tmr / 1000).toFixed(1);
	}
}
function svitok_time()
{
	if (title.match(/Мой герой|Мои умения/)) for (var i = 0; i <= 13; i++)
	{
		if (!rus_t.match(name_scrl[i]) && !/нет/.test(svitok[i])) svitok[i] = 0;
	}
	if (title.match(/Мой герой/)) for (var i = 0; i <= 12; i++)
	{
		if (rus_t.match(name_scrl[i]) && !/\d+/.test(svitok[i]) && (actv_svitok_n[i] > 0 || actv_svitok_l[i] > 0) && abilities != '')
		{
			click(abilities, tmt);
			break;
		}
	}
	if (title.match('Мои умения'))
	{
		var r_tm = r_num(30, 120);
		for (var i = 0; i <= 13; i++)
		{
			var reg = new RegExp(name_scrl[i] + " \\[(\\d+):(\\d+):(\\d+)", "i");

			if (reg.test(rus_t)) svitok[i] = get_sec(reg.exec(rus_t)) + comp_time + r_tm;
		}
	}
	ss.svitok = svitok;
}
function select_abil()
{
	if (ss.abilities == undefined && !((boss || in_events != 0) && (attack_vrag != '' || heal != ''))) click('/user/abilities', tmt);
	if (title.match('Мои умения'))
	{
		ss.abilities = '';
		for (var i = 5; i > 0; i--)
		{
			if (rus_t.match("Выбрать набор " + i)) {ss.abilities = i + " "; break;}
			else ss.abilities = "0 ";
		}
		for (var i = 1; i <= 5; i++) if (abil_link[i] == '' && rus_t.match('Выбрать набор ' + i)) ss.abilities += i + ',';
		
		if (!rus_t.match('Умения нельзя менять в бою') && ss.set_abil != undefined && abil_link[ss.set_abil] != '') click(abil_link[ss.set_abil], tmt);
		
		ss.removeItem('set_abil');
	}
	if (ss.abilities != undefined)
	{
		if (ss.abilities[0] >= ss.set_abil && title.match('Варвары') && ss.set_abil != undefined) click('/user/abilities', tmt);

		else for (var i = 0; i < 12; i++)
		{
			if (ss.abilities[0] >= abil_num[i] && abil_num[i] != 0 && !ss.abilities.match(abil_num[i] + ','))
			{
				if (i == 0 && in_towers != 0) 
				{
					ss.set_abil = abil_num[i];
					ss.change_set += 'g';
				}
				if (i == 1 && attack == '' && !rus_t.match(/через (\d+) сек|Ваш герой погиб/) && title.match('Арена')) 
				{
					ss.set_abil = abil_num[i];
					ss.change_set += 'a';
				}
				if (i == 2 && attack == '' && heal == '' && vzamok == '' && in_events == 11) 
				{
					ss.set_abil = abil_num[i];
					ss.change_set += 'a';
				}
				if (i == 3 && attack == '' && (title.match(/Турнир героев/) || title.match(/Передышка/) && !rus_t.match(/Наши:/)))  
				{
					ss.set_abil = abil_num[i];
					ss.change_set += 'a';
				}
				if (i == 4 && attack == '' && (title.match(/Командный турнир/) || title.match(/Передышка/) && rus_t.match(/Наши:/))) 
				{
					ss.set_abil = abil_num[i];
					ss.change_set += 'a';
				}
				if (i == 5 && attack == '' &&!rus_t.match(/через (\d+) сек|Ваш герой погиб/) && title.match('Выживание')) 
				{
					ss.set_abil = abil_num[i];
					ss.change_set += 'a';
				} 
				if (i == 6 && attack == '' && heal == '' && !rus_t.match(/откроется|через (\d+) сек|Битва претендентов/) && title.match('Территория')) 
				{
					ss.set_abil = abil_num[i];
					ss.change_set += 'a';
				}
				if (i == 7 && attack == '' && heal == '' && title.match('Битва героев')) 
				{
					ss.set_abil = abil_num[i];
					ss.change_set += 'a';
				}
				if (i == 8 && attack == '' && !rus_t.match(/через (\d+) сек/) && title.match('Поля сражений')) 
				{
					ss.set_abil = abil_num[i];
					ss.change_set += 'a';
				}
				if (i == 9 && attack == '' && heal == '' && boss) 
				{
					ss.set_abil = abil_num[i];
					ss.change_set += 'a';
				}
				if (i == 10 && attack == '' && heal == '' && title.match('Логово Геррода')) 
				{
					ss.set_abil = abil_num[i];
					ss.change_set += 'a';
				}
				if (i == 11 && attack == '' && title.match(/Цари Горы/i)) 
				{
					ss.set_abil = abil_num[i];
					ss.change_set += 'a';
				}
				if (i == 12 && attack == '' && vernutsa != '' && title.match(/Город Древних|Врата|Стены|Храм|Площадь|Мифриловый Зал/)) 
				{
					ss.set_abil = abil_num[i];
					ss.change_set += 'g';
				}
				if (i == 13 && attack == '' && in_events == 12) 
				{
					ss.set_abil = abil_num[i];
					ss.change_set += 'g';
				}
			}
		}
	}
}
function select_stan()
{
	if (ss.stances == undefined && !((boss || in_events != 0) && (attack_vrag != '' || heal != ''))) click('/user/stances', tmt);
	if (title.match('Таланты'))
	{
		ss.stances = '';
		for (var i = 5; i > 0; i--)
		{
			if (rus_t.match("Выучить набор " + i)) {ss.stances = i + " "; break;}
			else ss.stances = "0 ";
		}
		for (var i = 1; i <= 5; i++) if (stan_link[i] == '' && rus_t.match('Выучить набор ' + i)) ss.stances += i + ',';

		if (!rus_t.match('Менять таланты в бою нельзя') && ss.set_stan != undefined && stan_link[ss.set_stan] != '') click(stan_link[ss.set_stan], tmt);

		ss.removeItem('set_stan');
	}
	if (ss.stances != undefined)
	{
		if (ss.stances[0] >= ss.set_stan && title.match('Варвары') && ss.set_stan != undefined && !action) click('/user/stances', tmt);

		else for (var i = 0; i < 12; i++)
		{
			if (ss.stances[0] >= stan_num[i] && stan_num[i] != 0 && !ss.stances.match(stan_num[i] + ','))
			{
				if (i == 0 && in_towers != 0) 
				{
					ss.set_stan = stan_num[i];
					ss.change_set += 'g';
				}
				if (i == 1 && attack == '' && !rus_t.match(/через (\d+) сек|Ваш герой погиб/) && title.match('Арена')) 
				{
					ss.set_stan = stan_num[i];
					ss.change_set += 's';
				}
				if (i == 2 && attack == '' && heal == '' && vzamok == '' && in_events == 11) 
				{
					ss.set_stan = stan_num[i];
					ss.change_set += 's';
				}
				if (i == 3 && attack == '' && (title.match(/Турнир героев/) || title.match(/Передышка/) && !rus_t.match(/Наши:/)))  
				{
					ss.set_stan = stan_num[i];
					ss.change_set += 's';
				}
				if (i == 4 && attack == '' && (title.match(/Командный турнир/) || title.match(/Передышка/) && rus_t.match(/Наши:/))) 
				{
					ss.set_stan = stan_num[i];
					ss.change_set += 's';
				}
				if (i == 5 && attack == '' &&!rus_t.match(/через (\d+) сек|Ваш герой погиб/) && title.match('Выживание')) 
				{
					ss.set_stan = stan_num[i];
					ss.change_set += 's';
				}
				if (i == 6 && attack == '' && heal == '' && !rus_t.match(/откроется|через (\d+) сек|Битва претендентов/) && title.match('Территория')) 
				{
					ss.set_stan = stan_num[i];
					ss.change_set += 's';
				}
				if (i == 7 && attack == '' && heal == '' && title.match('Битва героев')) 
				{
					ss.set_stan = stan_num[i];
					ss.change_set += 's';
				}
				if (i == 8 && attack == '' && !rus_t.match(/через (\d+) сек/) && title.match('Поля сражений')) 
				{
					ss.set_stan = stan_num[i];
					ss.change_set += 's';
				}
				if (i == 9 && attack == '' && heal == '' && boss) 
				{
					ss.set_stan = stan_num[i];
					ss.change_set += 's';
				}
				if (i == 10 && attack == '' && heal == '' && title.match('Логово Геррода')) 
				{
					ss.set_stan = stan_num[i];
					ss.change_set += 's';
				}
				if (i == 11 && attack == '' && title.match(/Цари Горы/i)) 
				{
					ss.set_stan = stan_num[i];
					ss.change_set += 's';
				}
				if (i == 12 && attack == '' && vernutsa != '' && title.match(/Город Древних|Врата|Стены|Храм|Площадь|Мифриловый Зал/)) 
				{
					ss.set_stan = stan_num[i];
					ss.change_set += 'g';
				}
				if (i == 13 && attack == '' && in_events == 12) 
				{
					ss.set_stan = stan_num[i];
					ss.change_set += 'g';
				}				
			}
		}
	}
}
function select_body()
{
	if (ss.body == undefined && !((boss || in_events != 0) && (attack_vrag != '' || heal != ''))) click('/user/body', tmt);
	if (title.match("Моё снаряжение"))
	{
		ss.body = '';

		for (var i = 5; i > 0; i--)
		{
			if (rus_t.match("Надеть комплект " + i)) {ss.body = i + " "; break;}
			else ss.body = "0 ";
		}
		for (var i = 1; i <= 5; i++) if (item_link[i] == '' && rus_t.match('Надеть комплект ' + i)) ss.body += i + ',';
	
		if (!rus_t.match('Переодеваться в бою нельзя') && ss.set_body != undefined && item_link[ss.set_body] != '') click(item_link[ss.set_body], tmt);

		ss.removeItem("set_body");
	}
	if (ss.body != undefined)
	{
		if (ss.body[0] >= ss.set_body && title.match('Варвары') && ss.set_body != 0 && ss.set_body != undefined)
		{
			click('/user/body', tmt);
		}
		else for (var i = 0; i < 12; i++)
		{
			if (ss.body[0] >= body_num[i] && body_num[i] != 0 && !ss.body.match(body_num[i] + ','))
			{
				if (i == 0 && in_towers != 0) 
				{
					ss.set_body = body_num[i];
					click(na_glavnuy, tmt);
				}
				if (i == 1 && attack == '' && !rus_t.match(/через (\d+) сек|Ваш герой погиб/) && title.match('Арена')) 
				{
					ss.set_body = body_num[i];
					ss.change_set += 'b';
				}
				if (i == 2 && attack == '' && heal == '' && vzamok == '' && in_events == 11) 
				{
					ss.set_body = body_num[i];
					ss.change_set += 'b';
				}
				if (i == 3 && attack == '' && (title.match(/Турнир героев/) || title.match(/Передышка/) && !rus_t.match(/Наши:/))) 
				{
					ss.set_body = body_num[i];
					ss.change_set += 'b';
				}
				if (i == 4 && attack == '' && (title.match(/Командный турнир/) || title.match(/Передышка/) && rus_t.match(/Наши:/))) 
				{
					ss.set_body = body_num[i];
					ss.change_set += 'b';
				}
				if (i == 5 && attack == '' &&!rus_t.match(/через (\d+) сек|Ваш герой погиб/) && title.match('Выживание')) 
				{
					ss.set_body = body_num[i];
					ss.change_set += 'b';
				}
				if (i == 6 && attack == '' && heal == '' && !rus_t.match(/откроется|через (\d+) сек|Битва претендентов/) && title.match('Территория')) 
				{
					ss.set_body = body_num[i];
					ss.change_set += 'b';
				}
				if (i == 7 && attack == '' && heal == '' && title.match('Битва героев')) 
				{
					ss.set_body = body_num[i];
					ss.change_set += 'b';
				}
				if (i == 8 && attack == '' && !rus_t.match(/через (\d+) сек/) && title.match('Поля сражений')) 
				{
					ss.set_body = body_num[i];
					ss.change_set += 'b';
				}
				if (i == 9 && attack == '' && heal == '' && boss) 
				{
					ss.set_body = body_num[i];
					ss.change_set += 'b';
				}
				if (i == 10 && attack == '' && heal == '' && title.match('Логово Геррода')) 
				{
					ss.set_body = body_num[i];
					ss.change_set += 'b';
				}
				if (i == 11 && attack == '' && title.match(/Цари Горы/i)) 
				{
					ss.set_body = body_num[i];
					ss.change_set += 'b';
				}
				if (i == 12 && attack == '' && vernutsa != '' && title.match(/Город Древних|Врата|Стены|Храм|Площадь|Мифриловый Зал/)) 
				{
					ss.set_body = body_num[i];
					ss.change_set += 'g';
				}
				if (i == 13 && attack == '' && in_events == 12) 
				{
					ss.set_body = body_num[i];
					ss.change_set += 'g';
				}
			}
		}		
	}
}
function change_set()
{
	if (ss.change_set == undefined) return;

	if (ss.change_set.match(/g/))
	{
		click(na_glavnuy, tmt);
		ss.change_set=ss.change_set.replace(/g/, '') ;

	}

	else if (ss.change_set.match(/a/))
	{
		click('/user/abilities', tmt);
		ss.change_set=ss.change_set.replace(/a/, '') ;
	}
		else if (ss.change_set.match(/s/))
	{
		click('/user/stances', tmt);
		ss.change_set=ss.change_set.replace(/s/, '') ;
	}
		else if (ss.change_set.match(/b/))
	{
		click('/user/body', tmt);
		ss.change_set=ss.change_set.replace(/b/, '') ;
	}
}
function txt(node)
{
	if (node.text != undefined || null) return node.text;
	else return node.textContent;
}
function get_sec(time)
{
	return Number(Number(time[1]) * 3600 + Number(time[2]) * 60 + Number(time[3]));
}
function r_num(min, max)
{
	if (max == undefined) return Math.floor(Math.random() * min);
	else return Math.floor(Math.random() * (max - min) + min);
}
function get_cookie(name)
{
	var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Сменить "\n" на "\r\n" в расширеном поиске!

// Как запустить много персов в одной опере.

// Качаеш оперу не ниже 12 версии, я качнул opera@usb12.15
// Заходим в папку opera/profile открываем файл "override.ini"
// В файле ищем Секцию - [ваш сайт]
// В конец секции прописать строку : User Prefs|Custom User-Agent=значение (значение - ето и есть ваш юзер агент)
// Што б небыло переадресации Нужен "поломаный юзер-агент" (недействительный, примеры: "opera", "barbars", "mongol")
