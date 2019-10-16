import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #333333;
`

export const Section1 = styled.div`
      background: #eeeeee;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Section2 = styled.div`

`

export const Section3 = styled.div`

`

export const NewBlock = styled.div`

`
export const Img = styled.img`
    width: 27%;
    height: 210px


`

export const Title = styled.h1`
  font-size: 3em;
  letter-spacing: 2px;
  text-align: center;
  margin-top: 0px;
`

export const BtnDiv = styled.div`
  width: 100%;
  margin: 10px 0px 10px 0px;
  display: flex;
  justify-content: space-evenly
`

export const Button = styled.button`
  width: 18%;
  height: 50px;
  border: 1px solid #333333;
  border-radius: 3px;
  background: black;
  color: white;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 9px 0px white;
  }
`