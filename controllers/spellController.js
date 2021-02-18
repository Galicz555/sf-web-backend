const qs = require('qs');

class SpellController {
  constructor(spellService, getIdFromToken) {
		this.spellService = spellService;
		this.postSpell = this.postSpell.bind(this);
    this.inTransformer = this.inTransformer.bind(this);
    this.constructObject = this.constructObject.bind(this);
    this.outTransformer = this.outTransformer.bind(this);
    this.getIdFromToken = getIdFromToken;
    this.mappedSpell = {};
  }

  inTransformer (spell) {
    const {
      name, desc, higher_level,
      range, area_of_effect, material,
      ritual, duration, concentration,
      casting_time, level, dc,
      school, components, damage
    } = spell;
    this.mappedSpell = {
      name: name,
      schoolName: school.name,
      desc: desc.join(', '),
      component: components.join(', '),
      higherLevel: higher_level.join(', '),
      range: range,
      areaOfEffect: `${area_of_effect.type} ${area_of_effect.size}`,
      material: material,
      ritual: ritual.toString(),
      duration: duration,
      concentration: concentration.toString(),
      castingTime: casting_time,
      level: level.toString(),
      damageType: damage.damage_type.name,
      damageAtSlotLevel: Object.entries(damage.damage_at_slot_level)
        .map(([key, value]) => {
          return `LvL${key}: ${value}`
        }).join(', '),
      dc: `${dc.dc_type.name} ${dc.dc_success}`,
    }
    return this.mappedSpell
  }

  constructObject = arr => {
    return arr.reduce((acc, val) => {
      const [key, value] = val;
      acc[key] = value;
      return acc;
    }, {});
  };

  outTransformer = array => {
    const spellKeys = Object.keys(this.mappedSpell);
    for(let i = 0; i < spellKeys.length; i++) {
      this.mappedSpell[spellKeys[i]] = array[i]
    }
    return this.mappedSpell
  }

  postSpell(req, res) {
    if (req.body && req.body.spell) {
      this.spell = req.body.spell;
      this.spellService.translateSpell(Object.values((this.inTransformer(req.body.spell)))).then(
        (response) => {res.status(200).json(this.outTransformer(response))},
        (error) => res.status(400).json({ Error: error.message }));
    } else res.status(400).json({ Error: 'Please provide a character id' });
  }
}

module.exports = SpellController;
