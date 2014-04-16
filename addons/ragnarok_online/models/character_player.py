from openerp.osv import fields
from . import Character


class PlayerCharacter(Character):
    _name = 'ro.player.character'
    _description = 'Ragnarok Online Player Character'

    _columns = {
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
