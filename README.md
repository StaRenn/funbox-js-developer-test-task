# Test task for FrontEnd JS developer position in FunBox https://dl.funbox.ru/qt-js.pdf

### You can test the app on https://starenn.github.io/funbox-js-developer-test-task/, i had to deploy this project on the free host, because starenn.github.io is busy with another project and i cant change its repo name at the moment.
---
#### Supports Internet Explorer 11
---
### `npm i`

#### To install all dependencies.

### `npm start`

#### To run the project on localhost:8080.

### `npm test`

#### To run tests.
---
- :white_check_mark: Новая точка маршрута добавляется с помощью ввода ее названия в текстовом поле и нажатия Enter. После этого:  
    - :white_check_mark: введенная точка маршрута отображается в конце списка уже добавленных точек; в текущем центре карты появляется маркер, обозначающий новую точку маршрута.
    - :white_check_mark: Напротив каждой точки маршрута в списке находится кнопка удаления, при ее нажатии точка маршрута пропадает из списка, а с карты пропадает ее маркер.  
    
- :white_check_mark: Порядок точек маршрута в списке можно изменять перетаскиванием.

- :white_check_mark: Маркеры, соответствующие точкам маршрута, можно перемещать по карте перетаскиванием.

- :white_check_mark: Маркеры на карте соединены прямыми линиями в том порядке, в котором они находятся в списке. Полученная таким образом ломаная изображает маршрут,
первая точка в списке — начало маршрута, последняя — конец маршрута.

- :white_check_mark: При изменении порядка точек в списке или их удалении, а также при перемещении маркеров маршрут на карте автоматически перерисовывается.

- :white_check_mark: При клике на маркер появляется балун, в балуне отображается название соответствующей ему точки. 
