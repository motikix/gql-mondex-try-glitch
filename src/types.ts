import { ObjectType, InputType, Field } from 'type-graphql'

@InputType()
export class Filter {
  @Field({ nullable: true })
  name: string
}

@ObjectType()
export class Mon {
  @Field()
  mid: number

  @Field()
  sid: number

  _name: string
  _sname?: string

  @Field(() => String)
  get name() {
    return this._name + (this._sname ? `（${this._sname}）` : '')
  }

  @Field(() => [String])
  sexes: string[]

  @Field(() => String)
  class?: string

  @Field(() => [String])
  types: string[]

  @Field()
  height: number

  @Field()
  weight: number

  @Field(() => [Characteristic])
  characteristics: Characteristic[]

  @Field()
  hp: number

  @Field()
  atk: number

  @Field()
  def: number

  @Field()
  satk: number

  @Field()
  sdef: number

  @Field()
  agi: number

  @Field(() => [String])
  descriptions: string[]

  @Field(() => [Evolution])
  evolutions: Evolution[]

  @Field(() => [AnotherStyle])
  anotherStyles: AnotherStyle[]
}

@ObjectType()
export class Characteristic {
  @Field()
  name: string

  @Field()
  description: string
}

@ObjectType()
export class Evolution {
  @Field()
  mid: number

  @Field()
  name: string

  @Field(() => [String])
  types: string[]
}

@ObjectType()
export class AnotherStyle {
  @Field()
  mid: number

  @Field()
  sid: number

  @Field()
  name: string

  @Field({ nullable: true })
  sname?: string

  @Field(() => [String])
  types: string[]
}
