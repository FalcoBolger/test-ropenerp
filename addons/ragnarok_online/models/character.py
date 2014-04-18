from openerp.osv import fields
from openerp.osv.osv import Model


class Character(Model):
    _name = 'ro.character'
    _description = 'Ragnarok Online Base Character'

    _columns = {
        'name': fields.char('Name of the character'),
        'type': fields.selection([
            ('npc', 'NPC'),
            ('monster', 'Monster'),
            ('player', 'Player')
        ], 'Character type'),
    }
