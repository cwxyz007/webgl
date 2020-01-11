import { warn, loadImage, isPowerOf2 } from './utils.js'

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
   * @param {Array} buffer
   * @param {'array_buffer' | 'element_array_buffer'} [target]
   * @param {'static_draw' | 'dynamic_draw' | 'stream_draw'} [usage]
   */
  createBuffer(buffer, target, usage) {
    const usageMap = {
      static_draw: this.gl.STATIC_DRAW,
      dynamic_draw: this.gl.DYNAMIC_DRAW,
      stream_draw: this.gl.STREAM_DRAW
    }

    const targetMap = {
      array_buffer: this.gl.ARRAY_BUFFER,
      element_array_buffer: this.gl.ELEMENT_ARRAY_BUFFER
    }

    target = targetMap[target] || this.gl.ARRAY_BUFFER
    usage = usageMap[usage] || this.gl.STATIC_DRAW

    const glBuffer = this.gl.createBuffer()
    this.gl.bindBuffer(target, glBuffer)
    this.gl.bufferData(target, buffer, usage)

    return glBuffer
  }

  bindArrayBuffer({ buffer, location, numComponents, type, normalize, stride, offset } = {}) {
    numComponents = numComponents || 3
    type = type || this.gl.FLOAT
    normalize = !!normalize
    stride = stride || 0
    offset = stride || 0

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer)
    this.gl.vertexAttribPointer(location, numComponents, type, normalize, stride, offset)

    this.gl.enableVertexAttribArray(location)
  }

  loadTexture(url, defaultColor = [0, 0, 255, 255]) {
    const gl =this.gl
    const texture = gl.createTexture()

    gl.bindTexture(gl.TEXTURE_2D, texture)

    const level = 0
    const internalFormat = gl.RGBA
    const width = 1
    const height = 1
    const border = 0
    const srcFormat = gl.RGBA
    const srcType = gl.UNSIGNED_BYTE
    const pixel = new Uint8Array([defaultColor])

    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel)

    loadImage(url).then((image) => {
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image)

      if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
        gl.generateMipmap(gl.TEXTURE_2D)
      } else {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      }
    })

    return texture
  }

  /**
   *
   * @param {(deltaTime: number) => void} renderCb
   */
  render(renderCb) {
    let then = 0

    const loop = (now) => {
      now *= 0.001

      const deltaTime = now - then
      then = now
      renderCb(deltaTime)
      requestAnimationFrame(loop)
    }

    requestAnimationFrame(loop)
  }

  /**
   *
   * @param {HTMLElement} el
   */
  mount(el) {
    el.append(this.canvas)
  }
}
