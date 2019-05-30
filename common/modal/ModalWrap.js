// Node-modules
import React, { useState } from 'react'
import { css, ClassNames } from '@emotion/core'
import styled from '@emotion/styled'
import ReactModal from 'react-modal'
import { useActions, useStore } from 'easy-peasy'

// Common
import { Box, Flex } from 'styles/ss-components'
import { boxCss } from 'styles/ss-utils'
import { ButtonClose } from 'common/svg/ButtonClose'
import { mediaUp, mediaDown } from 'styles/utils'

ReactModal.setAppElement('#__next')

export const ModalWrap = ({ style, Trigger, Content, className, isOpen, ...props }) => {
    const modalOpen = useStore(state => state.modalOpen)
    const closeModal = useActions(actions => actions.closeModal)
    const openModal = useActions(actions => actions.openModal)

    return (
        <div>
            {Trigger &&
                React.cloneElement(Trigger, {
                    onClick: () => openModal(),
                })}
            <ClassNames>
                {({ css, cx }) => (
                    <ReactModal
                        ariaHideApp={false}
                        isOpen={modalOpen}
                        onRequestClose={() => closeModal()}
                        className={cx(
                            css(_defaultContentCss),
                            css(...boxCss(props)),
                            className
                        )}
                        overlayClassName={cx(css(_overlayCss))}
                    >
                        <>
                            <_CloseButton aria-label="Close" onClick={() => closeModal()}>
                                <span aria-hidden="true">
                                    <ButtonClose />
                                </span>
                            </_CloseButton>
                            {React.cloneElement(Content)}
                        </>
                    </ReactModal>
                )}
            </ClassNames>
        </div>
    )
}

const _CloseButton = styled(Box)`
    z-index: 1000000;
    cursor: pointer;
    position: absolute;
    display: block;
    top: 16px;
    right: +16px;
    ${mediaUp('md')} {
        right: -16px;
        top: -16px;
    }
`

const _defaultContentCss = css`
    position: relative;
`

const _overlayCss = css`
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;
    overflow: auto;
    background-color: white;
    /* background-color: rgba(0, 0, 0, 0.8); */
    background-color: rgba(0, 0, 0, 0.2);
`
