'use client'

import { TonConnectUIProvider, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react'
import { Cell } from '@ton/core'
import React from 'react'
import { MANIFEST, RECEIVER_ADDRESS } from '@/config'
import { Button } from '../ui/button'

interface SendProps {
  amount: number
  onSend: (tx: string) => void
  className?: string
}

export const Ton: React.FC<SendProps> = ({ amount, onSend, className }) => {
  const wallet = useTonWallet()
  const [tonConnectUi] = useTonConnectUI()

  return (
    <div className={className}>
      {wallet ? (
        <Button
          className="w-full"
          onClick={() =>
            tonConnectUi
              .sendTransaction({
                validUntil: Math.floor(Date.now() / 1000) + 600,
                messages: [
                  {
                    address: RECEIVER_ADDRESS,
                    amount: Math.floor(amount * 1e9).toString()
                  }
                ]
              })
              .then((result) => {
                const cell = Cell.fromBase64(result.boc)
                const buffer = cell.hash()
                const hashHex = buffer.toString('hex')
                onSend(hashHex)
              })
          }
        >
          Оплатить в TON
        </Button>
      ) : (
        <Button onClick={() => tonConnectUi.openModal()} className="bg-theme text-white w-full">
          Подключить TON
        </Button>
      )}
    </div>
  )
}

export const TonProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <TonConnectUIProvider
      manifestUrl={MANIFEST}
      actionsConfiguration={{
        returnStrategy: 'https://t.me/test_ton_connect_dapp_bot/dapp'
      }}
      walletsListConfiguration={{
        includeWallets: [
          {
            appName: 'tonwallet',
            name: 'TON Wallet',
            imageUrl: 'https://wallet.ton.org/assets/ui/qr-logo.png',
            aboutUrl:
              'https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd',
            universalLink: 'https://wallet.ton.org/ton-connect',
            jsBridgeKey: 'tonwallet',
            bridgeUrl: 'https://bridge.tonapi.io/bridge',
            platforms: ['chrome', 'android']
          },
          {
            appName: 'nicegramWallet',
            name: 'Nicegram Wallet',
            imageUrl: 'https://static.nicegram.app/icon.png',
            aboutUrl: 'https://nicegram.app',
            universalLink: 'https://nicegram.app/tc',
            deepLink: 'nicegram-tc://',
            jsBridgeKey: 'nicegramWallet',
            bridgeUrl: 'https://bridge.tonapi.io/bridge',
            platforms: ['ios', 'android']
          },
          {
            appName: 'binanceTonWeb3Wallet',
            name: 'Binance Web3 Wallet',
            imageUrl:
              'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMEIwRTExIi8+CjxwYXRoIGQ9Ik01IDE1TDcuMjU4MDYgMTIuNzQxOUw5LjUxNjEzIDE1TDcuMjU4MDYgMTcuMjU4MUw1IDE1WiIgZmlsbD0iI0YwQjkwQiIvPgo8cGF0aCBkPSJNOC44NzA5NyAxMS4xMjlMMTUgNUwyMS4xMjkgMTEuMTI5TDE4Ljg3MSAxMy4zODcxTDE1IDkuNTE2MTNMMTEuMTI5IDEzLjM4NzFMOC44NzA5NyAxMS4xMjlaIiBmaWxsPSIjRjBCOTBCIi8+CjxwYXRoIGQ9Ik0xMi43NDE5IDE1TDE1IDEyLjc0MTlMMTcuMjU4MSAxNUwxNSAxNy4yNTgxTDEyLjc0MTkgMTVaIiBmaWxsPSIjRjBCOTBCIi8+CjxwYXRoIGQ9Ik0xMS4xMjkgMTYuNjEyOUw4Ljg3MDk3IDE4Ljg3MUwxNSAyNUwyMS4xMjkgMTguODcxTDE4Ljg3MSAxNi42MTI5TDE1IDIwLjQ4MzlMMTEuMTI5IDE2LjYxMjlaIiBmaWxsPSIjRjBCOTBCIi8+CjxwYXRoIGQ9Ik0yMC40ODM5IDE1TDIyLjc0MTkgMTIuNzQxOUwyNSAxNUwyMi43NDE5IDE3LjI1ODFMMjAuNDgzOSAxNVoiIGZpbGw9IiNGMEI5MEIiLz4KPC9zdmc+Cg==',
            aboutUrl: 'https://www.binance.com/en/web3wallet',
            deepLink: 'bnc://app.binance.com/cedefi/ton-connect',
            bridgeUrl: 'https://bridge.tonapi.io/bridge',
            platforms: ['chrome', 'safari', 'ios', 'android'],
            universalLink: 'https://app.binance.com/cedefi/ton-connect'
          }
        ]
      }}
    >
      {children}
    </TonConnectUIProvider>
  )
}
