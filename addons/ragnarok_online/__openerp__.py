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
        'static/src/js/ro_chrome.js'
    ],
    'css': [],
    'qweb': [
        'static/src/xml/ro_chrome.xml'
    ],
    'test': [],
    'auto_install': False,
    'installable': True,
}
