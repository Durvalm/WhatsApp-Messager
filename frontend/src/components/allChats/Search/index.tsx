import { Section, SearchBar, Input } from './styles'
import { AiOutlineSearch, AiOutlineMenu } from 'react-icons/ai'

export function Search() {
  return (
    <Section>
      <SearchBar>
        <Input>
          <AiOutlineSearch size={20} />
          <input type="text" placeholder="Search or start new chat"></input>
        </Input>
        <AiOutlineMenu />
      </SearchBar>
    </Section>
  )
}
