import JSX from 'jsxlite'

interface Props {
  name: string
}

const Message = ({ name }: Props) => {
  return (
    <div class="content">
      <h1>Hello, {name}</h1>
      <p class="description">TypeScript, JSX, Express, and Webpack Application</p>
      <div class="awful-selfie"/>
    </div>
  )
}

export default Message
