from openerp.osv import fields
from openerp.osv.osv import Model


class PlayerCharacter(Model):
    _name = 'ro.npc.character'
    _inherits = {
        'ro.character': 'base_character_id'
    }
    _description = 'Ragnarok Online NPC Character'

    _columns = {
        'base_character_id': fields.many2one(
            'ro.character',
            required=True,
            ondelete='restrict',
            string='Related Base Character'
        ),
    }

    _defaults = {
        'type': 'npc',
    }
