export interface ChatWSMessageBase {
  status: 'success' | 'error'
}

export interface ChatWSUnreadMessage extends ChatWSMessageBase {
  action: 'unread'
  data: {
    count: number
  }
}

export interface ChatWSNewMessage extends ChatWSMessageBase {
  action: 'message'
  data: {
    id: number
    message: string
    chat_id: number
    created_at: string
    author: string
  }
}

export interface ChatWSError extends ChatWSMessageBase {
  message: string
}

export interface ChatWSSendMessage extends ChatWSMessageBase {
  text: string
  chat_id: number
}
