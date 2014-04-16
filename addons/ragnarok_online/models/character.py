from openerp.osv import fields
from openerp.osv.osv import Model


class Character(Model):
    _name = 'ro.character'
    _description = 'Ragnarok Online Base Character'

    _columns = {
        'name': fields.char('Name of the character'),
        'user_id': fields.many2one('res.users', 'Owner user'),
        'playable': fields.boolean('Whether the character is a user\'s character or not (NPC)'),
    }

    def character_select(self, cr, uid, ids, context=None):
        pass
