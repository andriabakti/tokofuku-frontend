import message from './message'
// State
const state = {
  carts: [],
  cartCheckout: {
    products: [],
    totalPrice: 0
  },
  emailMember: '',
  invoice: ''
}

// Getters
const getters = {
  countTotalCart: (state) => {
    return state.carts.length
  },

  getInvoice: (state) => {
    return state.invoice
  },

  cartTotalPrice: (state) => {
    let total = 0
    state.carts.forEach(cart => {
      total += cart.product.price * cart.qty
    })
    return total
  },

  getAllCarts: (state) => state.carts

}

// Actions
const actions = {
  getCarts({
    commit
  }, carts) {
    commit('SET_CARTS', carts)
  },
  clearCartsWhenLogout({
    commit
  }) {
    commit('CLEAR_CARTS_WHEN_LOGOUT')
  }

}

// Mutations
const mutations = {
  SET_CARTS: (state, carts) => {
    state.carts = carts
  },

  GENERATE_INVOICE: (state) => {
    const d = new Date()
    const day = d.getDate().toString()
    const month = (d.getMonth() + 1).toString()
    const year = d.getFullYear().toString().split('').splice(2, 3).join('')
    const rnd = Math.random(0, 100).toString().substr(14).toString()
    const invoice = day + month + year + rnd
    state.invoice = invoice
  },

  ADD_TO_CART: (state, {
    product,
    qty,
    detail
  }) => {
    const productInCart = state.carts.find(val => {
      return val.product.id === product.id
    })
    console.log(productInCart)
    if (productInCart) {
      message.toastError('The selected product is already in the cart')
      return
    }
    message.toastSuccess('Product added to cart')
    state.carts.unshift({
      product,
      qty,
      detail
    })
  },

  REMOVE_PRODUCT_FROM_CART: (state, id) => {
    state.carts = state.carts.filter(cart => cart.product.id !== id)
  },

  SET_EMAIL_MEMBER: (state, payload) => {
    state.emailMember = payload
  },

  CLEAR_CART: (state) => {
    message.toastSuccess('Cart has been cleaned')
    state.carts = []
  },

  CLEAR_CARTS_WHEN_LOGOUT: (state) => {
    state.carts = []
  },

  SAVE_CART_TO_MODAL: (state, {
    products,
    price
  }) => {
    state.cartCheckout.products = products
    state.cartCheckout.totalPrice = price
    state.carts = []
  },

  MIN_QTY_CART: (state, {
    product,
    stock
  }) => {
    const productInCart = state.carts.find(val => {
      return val.product.id === product.id
    })

    if (productInCart) {
      if (productInCart.qty > 1) {
        productInCart.qty--
      }
    }
  },

  PLUS_QTY_CART: (state, {
    product,
    stock
  }) => {
    const productInCart = state.carts.find(val => {
      return val.product.id === product.id
    })

    if (productInCart) {
      if (productInCart.qty < stock) {
        productInCart.qty++
      }
    }
  },

  CHANGE_TOTAL_QTY: (state, {
    product,
    qty
  }) => {
    const productInCart = state.carts.find(val => {
      return val.product.id === product.id
    })
    if (productInCart) {
      if (Number(qty) < 1) {
        productInCart.qty = 1
      } else {
        productInCart.qty = Number(qty)
      }
    }
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
