from openerp.osv import fields
from openerp.osv.osv import Model


class User(Model):
    _inherit = 'res.users'
    _description = 'Ragnarok Online User Extension'

    _columns = {
        'character_ids': fields.one2many('ro.player.character', 'user_id', 'List of owned characters', ondelete="cascade"),
    }
