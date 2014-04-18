from openerp.osv import fields
from openerp.osv.osv import Model


class PlayerCharacter(Model):
    _name = 'ro.player.character'
    _inherits = {
        'ro.character': 'base_character_id'
    }
    _description = 'Ragnarok Online Player Character'

    _columns = {
        'user_id': fields.many2one('res.users', 'Owner user'),
        'base_character_id': fields.many2one(
            'ro.character',
            required=True,
            ondelete='restrict',
            string='Related Base Character'
        ),
        # Levels and Experience
        'base_level': fields.integer('LV'),
        'job_level': fields.integer('JobLV'),
        'base_experience': fields.integer('Base Exp'),
        'job_experience': fields.integer('Job Exp'),
        # Class
        # 'class': fields.selection(),
        # Stats
        'strength': fields.integer('STR'),
        'agility': fields.integer('AGI'),
        'vitality': fields.integer('VIT'),
        'intelligence': fields.integer('INT'),
        'dexterity': fields.integer('DEX'),
        'luck': fields.integer('LUK'),
        # Derived stats (SHOULD BE change into function fields)
        'maximum_hp': fields.integer('Max HP'),
        'maximum_sp': fields.integer('Max SP'),
        # Other Stats
        'weight_limit': fields.integer('Weight Limit'),
        # Customization
        'sex': fields.selection([
            ('male', 'Male'),
            ('female', 'Female')
        ]),
    }

    _defaults = {
        'type': 'player',
    }

    def character_select(self, cr, uid, ids, context=None):
        pass
