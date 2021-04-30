import { Popover } from '@varld/popover';

function MobileNavbarPopup() {
  return (
    <Popover popover={({ visible, open, close }) => {
      return (
        <div>
          I am a popover and i am {visible ? 'visible' : 'not visible'} and {open ? 'open' : 'not open'}

          <button onClick={() => close()}>
            Close me
          </button>
        </div>
      )
    }}>
      <button>I have a popover</button>
    </Popover>
  )
}export default MobileNavbarPopup