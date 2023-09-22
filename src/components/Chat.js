import '../index.css';

const Chat = () => {
  return (
    <div className='chat-container'>
        <Sidebar />
        <BottomContainer />
    </div>
  )
}

const Sidebar = () => {
    return (
      <div className='sidebar'></div>
    )
}

const BottomContainer = () => {
    return (
        <div className='bottom-container'>
            <TextareaContainer />
        </div>
    )
}

const TextareaContainer = () => {
    return(
        <div className='text-flex-positioner'>
            <div className='text-container'>
                <textarea placeholder='Send a Message' className='text-area' ></textarea>
                <div className='submit-button'>B</div>
            </div>
        </div>

    )
}

export default Chat