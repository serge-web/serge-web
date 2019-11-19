import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Checkbox from '@material-ui/core/Checkbox'

class MessageSenderMultichannel extends Component {
  constructor (props) {
    super(props)
    this.anchorRef = React.createRef()
    this.state = {
      open: false,
      selectedChannels: []
    }
  }

  handleClick () {
    if (this.state.selectedChannels.length) {
      this.state.selectedChannels.forEach((channelId, key) => {
        this.props.sendMessage(channelId, key < this.state.selectedChannels.length - 1)
      })
    } else {
      this.props.sendMessage()
    }
  };

  handleMenuItemClick (id) {
    if (this.state.selectedChannels.includes(id)) {
      this.setState({ selectedChannels: this.state.selectedChannels.filter(chId => chId !== id) })
    } else {
      this.setState({ selectedChannels: [...this.state.selectedChannels, id] })
    }
  };

  handleToggle () {
    this.setState({ open: !this.state.open })
  }

  sellectAllToggle () {
    if (this.state.selectedChannels.length === this.props.channels.length) {
      this.setState({ selectedChannels: [] })
    } else {
      this.setState({ selectedChannels: this.props.channels.map(channel => channel.value) })
    }
  }

  render () {
    // { multiChannelSendingChannels, sendMessage }

    return (
      <div className="form-group">
        <ButtonGroup
          variant="contained"
          color="primary"
          innerRef={this.anchorRef}
          aria-label="split button"
        >
          <Button onClick={this.handleClick.bind(this)}>
            {this.props.children}
            {this.state.selectedChannels.length > 0 && ` ${this.state.selectedChannels.length}/${this.props.channels.length}`}
          </Button>
          <Button
            size="small"
            aria-controls={this.state.open ? 'split-button-menu' : undefined}
            aria-expanded={this.state.open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={this.handleToggle.bind(this)}
          >
            <FontAwesomeIcon size="2x" icon={faAngleUp}/>
          </Button>
        </ButtonGroup>
        <Popper
          open={this.state.open}
          anchorEl={this.anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom'
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleToggle.bind(this)}>
                  <MenuList id="split-button-menu">
                    {this.props.channels.map(channel => {
                      const active = this.state.selectedChannels.includes(channel.value)
                      return (
                        <MenuItem
                          key={channel.value}
                          selected={active}
                          onClick={event => this.handleMenuItemClick.bind(this)(channel.value)}
                        >
                          <Checkbox
                            checked={active}
                            color="primary"
                            inputProps={{
                              'aria-label': 'secondary checkbox'
                            }}
                          />
                          {channel.name}
                        </MenuItem>
                      )
                    })}
                    <hr/>
                    <MenuItem
                      key='select-toggle'
                      selected={this.state.selectedChannels.length === this.props.channels.length}
                      onClick={this.sellectAllToggle.bind(this)}
                    >
                      <Checkbox
                        checked={this.state.selectedChannels.length === this.props.channels.length}
                        color="primary"
                        inputProps={{
                          'aria-label': 'secondary checkbox'
                        }}
                      />
                      Sellect All
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    )
  }
}

export default MessageSenderMultichannel
