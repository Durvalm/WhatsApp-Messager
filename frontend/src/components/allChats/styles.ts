import { styled } from 'styled-components'
import {
  AiFillPlusCircle,
  AiFillBulb,
  AiOutlineMore,
  AiFillWechat,
} from 'react-icons/ai'

export const Section = styled.section`
  flex: 0 0 30%;

  @media (max-width: 768px) {
    flex: 0 0 45%;
  }
`

export const Header = styled.div`
  height: 3.7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f2f5;
  padding: 0.7rem 1rem;
  border-right: 1px solid #d1d7db;
`

export const Profile = styled.div`
  display: flex;
  align-items: center;
  height: 2rem;

  img {
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 9999px;
    object-fit: cover;
  }
`

export const FuncIcons = styled.div`
  display: flex;
  gap: 1.5rem;
`

const BaseFuncIcons = styled.div`
  height: 4rem;
  padding: 1rem;
`

export const AddIcon = styled(AiFillPlusCircle)`
  ${BaseFuncIcons}
`
export const BulbIcon = styled(AiFillBulb)`
  ${BaseFuncIcons}
`
export const ChatIcon = styled(AiFillWechat)`
  ${BaseFuncIcons}
`
export const MoreIcon = styled(AiOutlineMore)`
  ${BaseFuncIcons}
`

export const EmptyListContainer = styled.div`
  width: 100%;
  height: calc(100% - 6.7rem);
  color: #41525d;
  font-size: 0.875rem;

  display: flex;
  justify-content: center;
  align-items: center;
`
