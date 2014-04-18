from openerp.osv import fields
from openerp.osv.osv import Model


class PlayerCharacter(Model):
    _name = 'ro.monster.character'
    _inherits = {
        'ro.character': 'base_character_id'
    }
    _description = 'Ragnarok Online Monster Character'

    _columns = {
        'base_character_id': fields.many2one(
            'ro.character',
            required=True,
            ondelete='restrict',
            string='Related Base Character'
        ),
    }

    _defaults = {
        'type': 'monster',
    }
