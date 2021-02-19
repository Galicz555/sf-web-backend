class SpellController {
  constructor(spellService, getIdFromToken) {
		this.spellService = spellService;
		this.postSpell = this.postSpell.bind(this);
    this.inTransformer = this.inTransformer.bind(this);
    this.constructObject = this.constructObject.bind(this);
    this.outTransformer = this.outTransformer.bind(this);
    this.falseToNo = this.falseToNo.bind(this);
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
      Név: name,
      Iskola: school.name,
      Leírás: desc.join(', '),
      Magasabb_szinten: higher_level.join(', '),
      Távolság: range,
      Területi_hatása: `${area_of_effect.type} ${area_of_effect.size}`,
      Varázslat_időtartama: duration,
      Összetevők: components.join(', '),
      Alapanyagok: material,
      Rituális: this.falseToNo(ritual.toString()),
      Koncentrációs: this.falseToNo(concentration.toString()),
      Varázslási_idő: casting_time,
      Szint: level.toString(),
      Sebzés_típus: damage.damage_type.name,
      Sebzések_magasabb_varázslat_slotból: Object.entries(damage.damage_at_slot_level)
        .map(([key, value]) => {
          return `LvL${key}: ${value}`
        }).join(', '),
      Mentő: `${dc.dc_type.name} ${dc.dc_success}`,
    }
    return this.mappedSpell
  }

  falseToNo = (string) => {
    return string === 'false' ? 'No' : string;
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
