{
    'name': 'OpenERP Ragnarok Online',
    'version': '0.1',
    'category': 'Hidden',
    'description': """
    Ragnarok Online
    """,
    'author': 'Victor Tabuenca Calvo',
    'website': 'http://openerp.com',
    'depends': ['base', 'web'],
    'data': [
        'views/character.xml',
        'views/menu.xml'
    ],
    'js': [
        'static/lib/three.js/build/three.min.js',
        'static/src/js/ro_chrome.js',
        'static/src/js/ro_view_list.js',
    ],
    'css': [],
    'qweb': [
        'static/src/xml/ro_chrome.xml'
    ],
    'images': [
        'static/src/img/icons/game_icon.png'
    ],
    'test': [],
    'auto_install': False,
    'installable': True,
}
