import { warn } from './utils.js'

export class WebGL {
  /**
   *
   * @param {number} [width]
   * @param {number} [height]
   */
  constructor(width = 600, height = 400) {
    this.canvas = document.createElement('canvas')
    this.canvas.width = width
    this.canvas.height = height
    this.gl = this.canvas.getContext('webgl2')
  }

  clear() {
    this.gl.clearColor(0, 0, 0, 1)
    this.gl.clearDepth(1.0)
    this.gl.enable(this.gl.DEPTH_TEST)
    this.gl.depthFunc(this.gl.LEQUAL)

    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)
  }

  /**
   *
   * @param {string} vsSource
   * @param {string} fsSource
   */
  initShaderProgram(vsSource, fsSource) {
    const vertexShader = this.loadShader('vertex', vsSource)
    const fragmentShader = this.loadShader('fragment', fsSource)

    const shaderProgram = this.gl.createProgram()

    this.gl.attachShader(shaderProgram, vertexShader)
    this.gl.attachShader(shaderProgram, fragmentShader)
    this.gl.linkProgram(shaderProgram)

    if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
      warn(`Unable to initialize the shader program: ${this.gl.getProgramInfoLog(shaderProgram)}`)
      return null
    }

    return shaderProgram
  }

  /**
   *
   * @param {'vertex' | 'fragment'} type
   * @param {string} source
   */
  loadShader(type, source) {
    const shaderType = type === 'vertex' ? this.gl.VERTEX_SHADER : this.gl.FRAGMENT_SHADER
    const shader = this.gl.createShader(shaderType)
    this.gl.shaderSource(shader, source)
    this.gl.compileShader(shader)

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      this.gl.deleteShader(shader)
      warn(`An error occurred compiling the shaders ${this.gl.getShaderInfoLog(shader)}`)
      return null
    }

    return shader
  }

  /**
   *
   * @param {HTMLElement} el
   */
  mount(el) {
    el.append(this.canvas)
  }
}
