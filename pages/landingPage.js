import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import axios from 'axios'
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';

export default class LandingPage extends Component {
  state = {
    name: "",
    email: "",
    introduction: "",
    portfolioLink: "",
    errorMessage: "",
    isValid: false,
    isLoading: false,
    isSendingFormSuccess: false,
  }

  handleValidateInput() {
    let { name, email } = this.state;
    let message = {}
    message['email'] = email ?
      (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email) ?
        "" : "請輸入一個有效的電子信箱") : "請輸入email，我們會寄送後續活動訊息到此email"
    message['name'] = name ? "" : "請輸入姓名，讓我們知道怎麼稱呼你 :)"
    this.setState({ errorMessage: message })
    console.log("message", message)
    if (message.email || message.name) return
    this.handleCheckEmailisValid(message)
  }

  handleCheckEmailisValid(message) {
    this.setState({ isLoading: true })
    let { email, name, introduction, portfolioLink } = this.state
    console.log("noooo", email, name, introduction, portfolioLink )
    const uri = `https://cross-http.herokuapp.com/https://wizardamigoscodecamp-server-izjgtozwkk.now.sh/api/checkmail/${email}`
    axios.get(uri)
      .then((response) => {
        if (response.data.message == "email 已被使用") {
          console.log(response)
          this.setState({ errorMessage: { email: "email已被使用" } })
          this.setState({ isLoading: false })
        } else if (response.data.message == "email 可使用") {
          axios.post("https://cors-anywhere-ozncbyeprz.now.sh/https://wizardamigoscodecamp-server-izjgtozwkk.now.sh/api/insert", {
            email: email,
            name: name,
            interest: "",
            interests: "",
            skills: "",
            backgroundIntro: introduction,
            portfolioLink: portfolioLink
          })
            .then((response) => {
              this.setState({ isLoading: false })
              this.setState({ isSendingFormSuccess: true })
            })
            .catch((error) => console.log(error));
        }
      })
  }

  //上限1000字
  renderForm() {
    let { errorMessage } = this.state
    const styles = {
      hintStyle: { color: 'gray' },
      floatingLabelStyle: { color: '#e488ef' },
      floatingLabelFocusStyle: { color: '#e488ef' },
      underlineFocusStyle: { borderColor: '#e488ef' },
      inputStyle: { color: '#fff' },
    }
    return (
      <FormWrapper>
        <TextField
          hintText="Please enter your name"
          floatingLabelText="Name"
          fullWidth
          value={this.state.name}
          onChange={({ target }) => {
            this.setState({ name: target.value })
          }}
          {...styles}
          require
          errorText={errorMessage.name && errorMessage.name}
        />
        <TextField
          hintText="Please enter your email"
          floatingLabelText="Email"
          fullWidth
          value={this.state.email}
          onChange={({ target }) => {
            this.setState({ email: target.value })
          }}
          {...styles}
          errorText={errorMessage.email && errorMessage.email}
        />
        <TextField
          hintText="Introduce yourself a bit :)"
          floatingLabelText="Self-Introduction"
          fullWidth
          value={this.state.introduction}
          onChange={({ target }) => {
            this.setState({ introduction: target.value })
          }}
          multiLine={true}
          rows={5}
          {...styles}
          errorText={errorMessage.introduction && errorMessage.introduction}
        />
        <ButtonBlack
          onClick={() => {
            this.handleValidateInput()
          }}
          submit
        >Submit</ButtonBlack>
      </FormWrapper>
    )
  }

  render() {
    let { isLoading, isSendingFormSuccess } = this.state;
    let content = {
      whoWeAre: {
        chinese: 'Wizard Amigos 來自於德國柏林，目前是一個全球性的非盈利社群。我們的目標是為了給予每位想要更加了解技術及實現想法的人們工具及社群。學習如何建立網頁，行動裝置和桌面應用程式，以及為您的未來帶來了什麼樣的可能性。'
      },
      topics: {
        chinese: [
          '如何成為自雇者（商業模式圖，營銷/銷售基礎知識，財務/會計，如何創立公司/法律', '遠端工作（籌辦本地公司/協會', '區塊鏈的基本概念以及如何用JavaScript實作'
        ]
      }
    }

    return (
      <MuiThemeProvider>
        <div>
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
              <SubTitle>Who we are</SubTitle>
              <Wrapper>
                <ListWrapper>
                  Wizard Amigos was born in Berlin but is now a global, non-profit community.
                  Our aim is to give tools and community to everyone who wants to better understand technology and to
                  work
                  on their ideas.
                  Learn prototyping, how to use programming in science, how to build mobile and desktop apps, and what
                  possibilities can technology bring for your future.
                </ListWrapper>
              </Wrapper>
            </Container>
          </Scene2>
          <Scene3>
            <Wrapper>
              <SubTitle>What - Topics</SubTitle>
              <List> Self Employment (business model canvas, basics of marketing/sales, finances/accounting, how to
                open a company/legal)</List>
              <List>Remote Gigs/Jobs (forming a local agency/cooperative (as an app)，</List>
              <List>JavaScript (how to build web, desktop and mobile apps)</List>
              <List>foundations of blockchain and crypto.</List>
              <List>learn about "secure scuttlebutt" and/or the "dat project”(Bit Torrent 2.0 P2P systems)</List>

            </Wrapper>
          </Scene3>
          <Scene2>
            <SubTitle>Learn Cyber Nomad spirit with Alex and Nina!</SubTitle>
          </Scene2>
          <Scene5>
            <Wrapper>
              <PhotoContainer>
                <PhotoWrapper>
                  <Lecturer>
                    <Photo big
                           src="https://raw.githubusercontent.com/TzuYuanLiu/wizardamigos-codecamp2018/master/alex2.jpg" />
                    <TitleOftheEvent>Lecturer</TitleOftheEvent>
                    <Name>Alex Praetorius</Name>
                    <Introduction>JavaScript cyber nomad debugging the global economy with projects like @codingamigos,
                      @refugeeswork and @wizardamigos (the workshop is part of @wizardamigos)
                    </Introduction>
                  </Lecturer>
                  <Lecturer>
                    <Photo big
                           src="/static/nina2.jpg" />
                    <TitleOftheEvent>Lecturer</TitleOftheEvent>
                    <Name>Nina Breznik</Name>
                    <Introduction>Hacktivist http://www.refugeeswork.com/
                      Community builder http://codingamigos.com/
                      & @wizardamigos Solopreneur http://fairydust.agency/</Introduction>
                  </Lecturer>
                </PhotoWrapper>
                <PhotoWrapper>
                  <CoOrganizer>
                    <Photo
                      src="/static/tzuyuan.jpg" />
                    <TitleOftheEvent>Co-organizers</TitleOftheEvent>
                    <Name small>Tzuyuan Liu</Name>
                    <Description>Web Frontend developer</Description>
                  </CoOrganizer>
                  <CoOrganizer>
                    <Photo
                      src="/static/jerry.jpg" />
                    <TitleOftheEvent>Co-organizers</TitleOftheEvent>
                    <Name small>Jerry Lin</Name>
                    <Description>Blockchain ecosystem engineer</Description>
                  </CoOrganizer>
                  <CoOrganizer>
                    <Photo
                      src="https://raw.githubusercontent.com/TzuYuanLiu/wizardamigos-codecamp2018/master/kang.jpg" />
                    <TitleOftheEvent>Co-organizers</TitleOftheEvent>
                    <Name small>Oo Kang ZhengKang</Name>
                    <Description>Interactive Engineer</Description>
                  </CoOrganizer>
                </PhotoWrapper>
              </PhotoContainer>
            </Wrapper>
          </Scene5>

          <Scene6>
            <Wrapper>
              <SubTitle>Submit Form</SubTitle>
              {isSendingFormSuccess ? "成功！！！！" :
                isLoading ? <FormLoadingWrapper><CircularProgress
                    color="#e488ef"
                    size={80}
                    thickness={5} /></FormLoadingWrapper> : this.renderForm()
              }
            </Wrapper>
          </Scene6>
          <Footer>
            <Wrapper>
              wizardamigos.codecamp@gmail.com
              WizardAmigos @wizardamigos
              WizardAmigos is a FREE open source, open collaborative, and free DIY programming school from Berlin, now
              starting in Taipei. People of all skill levels and backgrounds are welcome to join and learn together.
            </Wrapper>
          </Footer>
        </div>
      </MuiThemeProvider>
    )
  }
}

const Black = '#030707'

const Container = styled.div`
width: 100%;
color: #fff;
display: flex;
flex-direction: column;
`
const Wrapper = styled.div`
width: 80%;
margin: auto;
padding: 40px 0;
`
const Scene1 = styled.div`
height: 800px;
background-image: url('/static/main_background1.jpg');
background-size:cover;
background-position: center;
`
const Title = styled.div`
display: flex;
font-size: 60px;
justify-content: center;
margin: 395px auto 25px;
@media(max-width: 768px) {
font-size: 6vw;
}
`
const ButtonWrapper = styled.div`
display: flex;
justify-content: center;
`
const Button = styled.div`
font-size: 30px;
padding: 10px;
cursor: pointer;
text-align: center;
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
width: 100%;
margin: 50px auto;
`}
`
const Scene2 = styled.div`
background: #3B323E;
display: flex;
justify-content: center;
align-items: center;
padding: 40px 0;
`
const SubTitle = styled.div`
font-size: 40px;
display: flex;
justify-content: center;
margin: 10px 0 10px 0;
`
const ListWrapper = styled.div`
justify-content: center;
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
background-image: url('/static/scene3.jpg');
background-size:cover;
width: 100%;
display: flex;
align-items: center;
transition: all .3s;
&:hover {
  filter: grayscale(0%);
}
`

const Scene5 = styled.div`
background: #171616;
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
justify-content: space-around;
@media(max-width: 768px) {
  flex-direction: column;
}
`
const Photo = styled.img`
align-self: center;
margin: 25px;
filter: grayscale(80%);
border-radius: 50%;
width: ${props => props.big ? '250px' : '180px'};
height: ${props => props.big ? '250px' : '180px'};
transition: all .3s;
filter: grayscale(80%);
&:hover {
  filter: grayscale(0%);
}
`
const Lecturer = styled.div`
display: flex;
flex-direction: column;
`
const CoOrganizer = styled.div`
display: flex;
flex-direction: column;
`
const TitleOftheEvent = styled.div`
display: flex;
align-self: center;
font-size: 20px;
`
const Name = styled.div`
font-size: ${ props => props.small ? '20px' : '40px'};
display: flex;
align-self: center;
line-height: 2;
`
const Scene6 = styled.div`
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
const Introduction = styled.div`
width: 100%;
font-size: 15px;
line-height: 1.5;
text-align: center;
`
const Footer = styled.div`
width: 100%;
height: 300px;
font-size: 15px;
text-align: center;
display: flex;
align-items: center;
background: #111111;
`
const Description = styled.div`
font-size: 14px;
line-height: 1.5;
text-align: center;
`
const FormLoadingWrapper = styled.div`
height: 415px;
text-align: center;
display: flex;
justify-content: center;
align-items: center;
`

