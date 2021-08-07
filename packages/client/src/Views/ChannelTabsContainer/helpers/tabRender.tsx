import FlexLayout, { TabNode } from 'flexlayout-react'
import { PlayerUi } from '@serge/custom-types'
import _ from 'lodash'
import findChannelByName from './findChannelByName'

const tabRender = (state: PlayerUi): (node: TabNode) => void => {
  return (node: TabNode): void => {
    setTimeout(() => {
      const tabLayout = document.getElementsByClassName('flexlayout__layout')[0]
      const tabSetHeaderElms = tabLayout.getElementsByClassName('flexlayout__tabset')
      const tabSetContentElms = tabLayout.getElementsByClassName('flexlayout__tab')
      
      let maximizedTabIdx = -1
      Array.from(tabSetHeaderElms).forEach((layout, idx) => {
        const style = layout.attributes.getNamedItem('style')
        if (!style) return
        
        if (node.getModel().getMaximizedTabset()) {
          /**
           * If a maximized tabset exists, hide other tabsets that is not the maximized one
           * maximized tabset has `z-index: 100`, the rest is not so we check and hide it
           * also make the tabset background color transaparent
           */
          if (style.value.indexOf('z-index: 100') === -1) {
            layout.classList.add('hide')
          } else {
            /**
             * Found the maximized tabset idx
             */
            maximizedTabIdx = idx
          }
        } else {
          /**
           * there is no maximized tabset, get all visible
           */
          layout.classList.remove('hide')

          /**
           * Reset default value
           */
          maximizedTabIdx = -1
        }
      })

      Array.from(tabSetContentElms).forEach((elm, idx) => {
        /**
         * Do not handle the maximized tabset
         */
        if (maximizedTabIdx === idx) return

        /**
         * If a maximized tabset exists, hide other tabsets content that is not the maximized one
         */
        if (node.getModel().getMaximizedTabset()) {
          elm.classList.add('hide')
        } else {
          /**
           * There is no maximized tabset, get all visible
           */
          elm.classList.remove('hide')
        }
      })
    })

    let channel: any;

    const addMenuItemMsgCount = (className: string) => {
      if (!className) return
      const overflowBtn = document.getElementsByClassName('flexlayout__tab_button_overflow')
      if (overflowBtn.length) {
        overflowBtn[0].addEventListener('click', () => {
          setTimeout(() => {
            const menuItems = document.getElementsByClassName('flexlayout__popup_menu_item')
            Array.from(menuItems).forEach((menuItem: Element) => {
              if (menuItem.textContent === node.getName()) {
                menuItem.classList.add(className)
              }
            })
          });
        })
      }
    }

    const setUnreadClassName = (className: string): void => {
      const nodeClassName = node.getClassName() || ''
      if (nodeClassName !== className && nodeClassName !== 'hide-node') {
        node.getModel().doAction(FlexLayout.Actions.updateNodeAttributes(node.getId(), { className }))
      }
    };

    if (!_.isEmpty(state.channels)) {
      const matchedChannel = findChannelByName(state.channels, node.getName())
      channel = matchedChannel && matchedChannel.length > 1 ? matchedChannel[1] : undefined

      if (channel !== undefined) {
        const className = !channel.unreadMessageCount ?
          '' : channel.unreadMessageCount < 9 ?
            `unread-${channel.unreadMessageCount}` : 'unread-9plus'
        setTimeout(() => {
          setUnreadClassName(className)
          addMenuItemMsgCount(className)
        })
      }
    }
  }
}
export default tabRender
