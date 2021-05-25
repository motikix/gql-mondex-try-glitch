import { Query, Resolver, Arg } from 'type-graphql'
import { Filter, Mon, Characteristic, Evolution, AnotherStyle } from './types'
import { mons, sex, clazz, type, characteristic } from './db'

@Resolver(Mon)
export class MonResolver {

  /**
   * モン達を返す
   */
  @Query(() => [Mon])
  mons(
    @Arg('filter', { nullable: true }) filter?: Filter
  ) {
    return mons.map(mon => genMon(mon))
  }

  /**
   * モンを返す
   */
  @Query(() => Mon, { nullable: true })
  mon(
    @Arg('mid') mid: number,
    @Arg('sid', { nullable: true, defaultValue: 0 }) sid: number
  ) {
    const m = mons.find(m => m.mid === mid && m.sid === sid)
    return m ? genMon(m) : null
  }
}

/**
 * モンを生成する
 */
// TODO: 今はゴリゴリやってるけど、最終的には OR マッパーを使う
const genMon = (mon: typeof mons[0]): Mon => {
  const m = new Mon()
  m.mid = mon.mid
  m.sid = mon.sid
  m._name = mon.name
  m._sname = mon.sname
  m.sexes = mon.sexes.flatMap(s => sex.find(ss => ss.id === s)?.name ?? [])
  m.class = clazz.find(c => c.id === mon.class)?.name
  m.types = mon.types.flatMap(t => type.find(tt => tt.id === t)?.name ?? [])
  m.height = mon.height
  m.weight = mon.weight
  m.characteristics = mon.characteristics.flatMap(c => {
    const character = characteristic.find(cc => cc.id === c)
    if (character) {
      const ins = new Characteristic()
      ins.name = character.name
      ins.description = character.description
      return ins
    } else {
      return []
    }
  })
  // m.hp = mon.hp
  m.hp = 1.5
  m.atk = mon.atk
  m.def = mon.def
  m.satk = mon.satk
  m.sdef = mon.sdef
  m.agi = mon.agi
  m.descriptions = mon.descriptions
  m.evolutions = mon.evolutions.flatMap(e => {
    const emon = mons.find(mm => mm.mid === e)
    if (emon) {
      const evo = new Evolution()
      evo.mid = emon.mid
      evo.name = emon.name
      evo.types = emon.types.flatMap(t => type.find(tt => tt.id === t)?.name ?? [])
      return evo
    } else {
      return []
    }
  })
  m.anotherStyles = mon.anotherStyles.flatMap(a => {
    const amon = mons.find(mm => mm.mid === mon.mid && mm.sid === a)
    if (amon) {
      const ano = new AnotherStyle()
      ano.mid = amon.mid
      ano.sid = amon.sid
      ano.name = amon.name
      ano.sname = amon.sname
      ano.types = amon.types.flatMap(t => type.find(tt => tt.id === t)?.name ?? [])
      return ano
    } else {
      return []
    }
  })
  return m
}
