import React from 'react'
import styled, {css} from 'styled-components'
import Head from 'next/head'
import styledNormalize from 'styled-normalize'
import axios from 'axios'

const Black = '#030707'

const Container = styled.div`
width: 100%;
color: #fff;
display: flex;
flex-direction: column;
`
const Scene1 = styled.div`
height: 80vh;
background-image: url('https://raw.githubusercontent.com/TzuYuanLiu/wizardamigos-codecamp2018/master/main_background1.jpg');
background-size:cover;
width: 100%;
`
const Title = styled.div`
display: flex;
font-size: 60px;
justify-content: center;
margin: 45vh auto 25px;
`
const ButtonWrapper = styled.div`
display: flex;
justify-content: center;
`
const Button = styled.div`
font-size: 30px;
padding: 10px;
cursor: pointer;
`
const ButtonWhite = styled(Button)`
background: #fff;
color: ${Black};
`
const ButtonBlack = styled(Button)`
border: solid 1px #fff;
font-size: 30px;
padding: 10px;
color: #fff;
&:hover {
  color: ${Black};
  background: #fff;
}
${props => props.submit && css`
width: 100px;
margin: auto;
`}
`
const Scene2 = styled.div`
height: 300px;
background: #3B323E;
display: flex;
justify-content: center;
align-items: center;
`
const SubTitle = styled.div`
font-size: 40px;
display: flex;
justify-content: center;
margin: 10px 0 10px 0;
`
const ListWrapper = styled.div`
justify-content: center;
width: 70%;
margin: 0 auto;
font-size: 25px;
line-height: 1.5;
` 
const List = styled.div`
font-size: 25px;
line-height: 1.5;
`
const Scene3 = styled.div`
filter: grayscale(80%);
height: 70vh;
background-image: url('https://raw.githubusercontent.com/TzuYuanLiu/wizardamigos-codecamp2018/master/scene3.jpg');
background-size:cover;
width: 100%;
display: flex;
align-items: center;
&:hover {
  filter: grayscale(0%);
}
`
const Scene5 = styled.div`
background: #171616;
height: 90vh;
`
const PhotoContainer = styled.div`
margin: auto;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
`
const PhotoWrapper = styled.div`
display: flex;
`
const Photo = styled.img`
margin: 25px;
filter: grayscale(80%);
border-radius: 50%;
width: ${props => props.big ? '250px' : '180px'};
height: ${props => props.big ? '250px' : '180px'};
filter: grayscale(80%);
&:hover {
  filter: grayscale(0%);
}
`
const Lecturer = styled.div`
display: flex;
flex-direction: column;
`
const TitleOftheEvent = styled.div`
display: flex;
align-self: center;
font-size: 20px;
`
const Name = styled.div`
font-size: 40px;
display: flex;
align-self: center;
`
const Scene6 = styled.div`
height: 80vh;
background: #070808;
`
const FormWrapper = styled.div`
width: 50%;
display: flex;
flex-direction: column;
justify-content: center;
margin: auto;
padding-top: 10vh;
& > input {
  margin: 20px 20px 65px;
}
& > textarea {
  margin: 20px;
  resize: none;
  height: 150px;
}
`

export default class LandingPage extends React.Component {
state = {
  name: "",
  email: "",
  introduction: ""
}

handleSubmit() {
    let {name, email, introduction} = this.state;
    axios.post("https://cross-http.herokuapp.com/https://wizardamigos-server.herokuapp.com/api/insert", {
      email: email, 
      name: name,
      interest: "",
      interests: "",
      skills: "",
      backgroundIntro: introduction,
      portfolioLink: ""
    })
    .then((response) => console.log(response)) 
    .catch((error) => console.log(error));
  } 
  //上限1000字

  render() {
    return (
      <div>
        <Head>
          <style>{`
             ${styledNormalize}
             html, body{
              font-family:Helvetica Neue, Helvetica, Arial, PingFang TC, 微软雅黑, Microsoft YaHei, 华文细黑, STHeiti, sans-serif;
              box-sizing: border-box;
              color: #fff;
            }
          `}</style>
        </Head>
        <body>
          <Scene1>
            <Container>
            <Title>Wizard Amigos CodeCamp 2018</Title>
            <ButtonWrapper>
              <ButtonWhite>LEARN MORE</ButtonWhite>
              <ButtonBlack>SIGN UP NOW!</ButtonBlack>
            </ButtonWrapper>  
            </Container>
          </Scene1>
          <Scene2>
            <Container>
              <SubTitle>Learn Block chain structure with JavaScript</SubTitle>
              <ListWrapper>
                <List>- JavaScript (how to build web, desktop and mobile apps)</List>
                <List>- foundations of blockchain and crypto.</List>
                <List>- learn about "secure scuttlebutt" and/or the "dat project”(Bit Torrent 2.0 P2P systems)</List>
              </ListWrapper>
            </Container>
          </Scene2>  
          <Scene3>
          <ListWrapper>
          - Self Employment (business model canvas, basics of marketing/sales, finances/accounting, how to open a company/legal)
          - Remote Gigs/Jobs (forming a local agency/cooperative (as an app)
          </ListWrapper>
          </Scene3>  
          <Scene2>
            <SubTitle>Learn Cyber Nomad spirit with Alex and Nina!</SubTitle>
          </Scene2>  
          <Scene5> 
            <PhotoContainer>
              <PhotoWrapper>
                <Lecturer>
                  <Photo big src="https://raw.githubusercontent.com/TzuYuanLiu/wizardamigos-codecamp2018/master/alex2.jpg"/>
                  <TitleOftheEvent>Lecturer</TitleOftheEvent>
                  <Name>Alex</Name>
                </Lecturer>
                <Lecturer>
                  <Photo big src="https://raw.githubusercontent.com/TzuYuanLiu/wizardamigos-codecamp2018/master/nina2.jpg"/>
                  <TitleOftheEvent>Lecturer</TitleOftheEvent>
                  <Name>Nina</Name>
                </Lecturer>
              </PhotoWrapper>
              
              <PhotoWrapper>
                <Photo src="https://raw.githubusercontent.com/TzuYuanLiu/wizardamigos-codecamp2018/master/tzuyuan.jpg"/>
                <Photo src="https://raw.githubusercontent.com/TzuYuanLiu/wizardamigos-codecamp2018/master/jerry.jpg"/>
                <Photo src="https://raw.githubusercontent.com/TzuYuanLiu/wizardamigos-codecamp2018/master/kang.jpg"/>
                </PhotoWrapper>
              <SubTitle>Co-Organiers</SubTitle>
            </PhotoContainer>
          </Scene5>   
          <Scene6> 
            <FormWrapper>
              name:
              <input 
                type="text"
                value={this.state.name}
                onChange={({target})=>{this.setState({name: target.value})}}
              />
              email: 
              <input 
                type="text"
                value={this.state.email}
                onChange={({target})=>{this.setState({email: target.value})}}
              />
              Introduce yourself a bit :) 
              <textarea 
                value={this.state.introduction}
                onChange={({target})=>{this.setState({introduction: target.value})}}
              />
            </FormWrapper>
            <ButtonBlack 
              onClick={(event) => this.handleSubmit()}
              submit
            >Submit</ButtonBlack>
          </Scene6>
        </body>
      </div>
    )
  } 
}

