-- Create Categories

INSERT INTO
    categories (id, title, image)
VALUES (
        '1',
        'Пурифайеры',
        'https://api-pufir-store.herokuapp.com/img/1.png'
    );

INSERT INTO
    categories (id, title, image)
VALUES (
        '2',
        'Фильтры',
        'https://api-pufir-store.herokuapp.com/img/1.png'
    );

INSERT INTO
    categories (id, title, image)
VALUES (
        '3',
        'Другое',
        'https://api-pufir-store.herokuapp.com/img/1.png'
    );

-- Create Sub Categories for "Пурифайеры"

INSERT INTO
    sub_categories (
        id,
        title,
        image,
        "categoriresId"
    )
VALUES (
        '1',
        'Напольные пурифайеры',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        '1'
    );

INSERT INTO
    sub_categories (
        id,
        title,
        image,
        "categoriresId"
    )
VALUES (
        '2',
        'Настольные пурифайеры',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        '1'
    );

INSERT INTO
    sub_categories (
        id,
        title,
        image,
        "categoriresId"
    )
VALUES (
        '3',
        'Пурифайеры с ультрафиолетом',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        '1'
    );

INSERT INTO
    sub_categories (
        id,
        title,
        image,
        "categoriresId"
    )
VALUES (
        '4',
        'Пурифайеры с кислородом',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        '1'
    );

INSERT INTO
    sub_categories (
        id,
        title,
        image,
        "categoriresId"
    )
VALUES (
        '5',
        'Пурифайеры с охлаждением',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        '1'
    );

INSERT INTO
    sub_categories (
        id,
        title,
        image,
        "categoriresId"
    )
VALUES (
        '6',
        'Пурифайеры с обратным осмосом',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        '1'
    );

INSERT INTO
    sub_categories (
        id,
        title,
        image,
        "categoriresId"
    )
VALUES (
        '7',
        'Пурифайеры с ультрафильтрацией',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        '1'
    );

INSERT INTO
    sub_categories (
        id,
        title,
        image,
        "categoriresId"
    )
VALUES (
        '8',
        'Пурифайеры с газацией',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        '1'
    );

-- Create Sub Categories for "Фильтры"

INSERT INTO
    sub_categories (
        id,
        title,
        image,
        "categoriresId"
    )
VALUES (
        '9',
        'Фильтры для воды',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        '2'
    );

INSERT INTO
    sub_categories (
        id,
        title,
        image,
        "categoriresId"
    )
VALUES (
        '10',
        'Фильтры для пурифайеров',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        '2'
    );

INSERT INTO
    sub_categories (
        id,
        title,
        image,
        "categoriresId"
    )
VALUES (
        '11',
        'Бытовые фильтры',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        '2'
    );

-- Create Sub Categories for "Другое"

INSERT INTO
    sub_categories (
        id,
        title,
        image,
        "categoriresId"
    )
VALUES (
        '12',
        'Краны для HoReCa',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        '3'
    );

INSERT INTO
    sub_categories (
        id,
        title,
        image,
        "categoriresId"
    )
VALUES (
        '13',
        'Питьевые фонтанчики',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        '3'
    );

INSERT INTO
    sub_categories (
        id,
        title,
        image,
        "categoriresId"
    )
VALUES (
        '14',
        'Запчасти для пурифайеров',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        '3'
    );

-- Create Brands

INSERT INTO brands (id, title) VALUES ('1', 'Ecomaster');

INSERT INTO brands (id, title) VALUES ('2', 'Ruhens');

-- Create WaterModes

INSERT INTO water_modes (id, title) VALUES ('1', 'Комнатная t');

INSERT INTO water_modes (id, title) VALUES ('2', 'Холодная');

INSERT INTO water_modes (id, title) VALUES ('3', 'Горячая');

INSERT INTO water_modes (id, title) VALUES ('4', 'Газированная');

INSERT INTO water_modes (id, title) VALUES ('5', 'Кислородная');

INSERT INTO water_modes (id, title) VALUES ('6', 'Лед');

-- Create Products

INSERT INTO
    products (
        id,
        title,
        description,
        price,
        "categoryId",
        "subCategoryId",
        "brandId",
        "waterModeId"
    )
VALUES (
        '1',
        'Пурифайер Ruhens BQP 300, белый',
        'Настольный пурифайер Ecomaster Cube с сенсорной панелью управления - яркий представитель нового поколения бытовой техники для домашнего и офисного использования. Футуристичный дизайн, уникальные технологии и инновационные конструктивные элементы удачно сочетаются в устройстве, которое гарантированно обеспечит вас необходимым количеством высококачественной и безопасной питьевой воды.',
        30,
        '1',
        '1',
        '1',
        '1'
    );

-- Add images for this product

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '1',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        1
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '6',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        2
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '7',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        3
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '8',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        4
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '9',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        5
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '10',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        6
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '11',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        7
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '12',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        8
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '13',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        9
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '14',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        10
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '15',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        11
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '16',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        12
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '17',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        13
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '18',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        14
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '19',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        15
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '20',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        16
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '21',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        17
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '22',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        18
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '23',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        19
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '24',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        20
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '25',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        21
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '26',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        22
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '27',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        23
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '28',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        24
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '29',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        25
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '30',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        26
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '31',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        27
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '32',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        28
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '33',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        29
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '34',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        30
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '35',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        31
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '36',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        32
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '37',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        33
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '38',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        34
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '39',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        35
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '40',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        36
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '41',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        37
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '42',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        38
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '43',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        39
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '44',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        40
    );

INSERT INTO
    products_images (id, url, "productsId")
VALUES (
        '45',
        'https://api-pufir-store.herokuapp.com/img/1.png',
        41
    );