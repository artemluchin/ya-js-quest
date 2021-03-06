## Домашнее задание JS

Добро пожаловать на ~~77-е глодные игры~~ квеcт [Dungeon of Doom](http://artemluchin.github.io/ya-js-quest/).

Сначала я опишу задачу на каждый уровень и что ожидается на этих уровнях от игроков.

После всех описаний я предоставлю ответы или правильный алгоритм действий для того, чтобы пройти
данный уровень.

Важный момент: я тестировал игру исключительно на Android(Chrome mobile). Как все выглядит на iOS ~~понятия не имею~~ немного представляю.
По сему, рекомендую проверять на Android-устройствах, дабы все работало как надо.

#### 1 уровень

Немного внес изменения в логику условия для прохождения уровня. Требуется не только
нажать одновременно три кнопки, а также нажать их в правильной последовательности.


#### 2 уровень

Здесь игроку необходимо подобрать вес гири так, чтобы он соответствовал заранее установленному
значению. Именять вес можно путем имзменения размеров гири с помощью жестов увеличения и уменьшения.


Изначально может показаться что "зум" работает не так, как обычно(медленно увеличивает). Это особенность
данной загадки.


#### 3 уровень

В данном уровне необходимо доставить кролика :rabbit: к его любимой морковке. Но вот беда: ему
мешают препятствия в виде каменных блоков. Не оставлять же его одного! Нужно помочь!


#### 4 уровень

Это финал. Это сундук. Это драгоценности! А что мы знаем про драгоценности? У них шикарная защита от взлома.
Вам предоставляется возможность ощутить себя взломщиком сейфового замка. Для того, чтобы
пройти данный уровень, а также и всю игру, вам нужно всего лишь набрать требуемую комбинацию
сейфового замка. Удачи! (используйте жест поворота)

Рекомендую пройти этот уровень на Android. У iOS нет поддержки некоторых интересных фич :disappointed:


### А теперь спойлеры

Я надеюсь, что ты, ИГРОК, провел ночи напролет, пытаясь отгадать секрет прохождения уровня!!!
И теперь ты готов на все, чтобы узнать как пройти конкретный уровень.

> Надеюсь, что так и было

Долгожданные решения "сложнейших" задач.


#### 1 уровень

_Ответ_: 1 - 3 - 2


#### 2 уровень

_Ответ_: Для того, чтобы набрать требуемый вес гири, необходимо использовать жест увеличения/уменьшения с
двумя, тремя и четыремя пальцами. Ситуация простая: в зависимости от количества используемых пальцев, изменяется
значение, на которое увеличивается/уменьшеается вес. Например, при использовании 2-х пальцев, значение увеличивается на 1.
При трех пальцах - на 10. И т.д. Максимальное количество пальцев: 4.

Могут быть ситуации, когда удастся угадать значение, не прибегая к использованию всех пальцев. Это ~~особенности
поведения функции распознания жестов~~ баги.


#### 3 уровень

Данный уровень легко проходится и в одиночку. Но, если вам кажется, что это не так, то вы можете позвать коллегу
для помощи.

_Ответ_: Чтобы кролик смог попасть к своей морковке, необходимо разнести каменные блоки в разные стороны. Но не только разнести.
Их также потребуется удерживать в разнесенном расстоянии, поскольку они имеют свойство возвращаться на исходное место. 
Собственно в этом и заключается решение. Разносим блоки и ведем кролика к заветной цели.


#### 4 уровень

Обида для тех, кто использует iOS. Вы не прочувствуете всех ощущений взлома сейфа. Эх.

_Ответ_: Тут две реализации.

- Сначала для Android. Поскольку Chrome mobile поддерживает vibrate API, то ситуация будет крайне приближена к реальной.

  Принцип действия: у механизма 4-значный код. Значения вводятся с помощью поворотного диска. Диск крутится по часовой и протов часовой стрелки.
  
  Поскольку вы взломщик профессионального уровня, то у вас с собой есть фонендоскоп (это штука на шее каждого доктора), который помогает услышать,
  какое значение является правильным, при прокрутке диска замка.
  
  > Вообще фонендоскопом пользуются, чтобы услышать звук щелчков механизма. Но в данной ситуации звук мы заменяем вибрацией.
  
  Если вы вдруг почувствовали вибрацию, значит фонендоскоп сработал и вы угадали правильное значение комбинации. Дальше необходимо
  двигаться в противоположном направлении вращения диска.
  
  Это особенность механизма. Если вы продолжите движение после угаданного значения, не изменив направление, то механизм, пройдя следующее значение по неправильному
  направлению, **сбросит** всю набранную ранее комбинацию!!! И придется начинать сначала. Поэтому придерживайтесь правила: как только почувствовали вибрацию, крутите
  **в противоположную** сторону.
  
- Теперь для iOS. Не стоит расстраиваться раньше времени. Вы же пользователь техники Apple, а значит у вас есть различные модные гаджеты.
  
  Одним из таких является прибор, который вы взяли на дело. Он как и фонендоскоп, поможет определить момент прохождения нужного значения.
  Только принцип действия разный. Ваш прибор настолько шикарный, что сможет сообщить о правильном значении только миганием красного светодиода.
  
  Как только увидели его моргание - вы угадали. **Разворачивайте диск** в другую сторону.


На этом все. До встречи в следующих квестах!
  
