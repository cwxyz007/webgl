export function warn(...args) {
  console.warn(...args)
}

/**
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number[]} center
 */
export function createCube(x, y, z, center = [0, 0, 0]) {
  x = x/2
  y = y /2
  z = z/2
  

  const cubeFaceVertex = [
    // front 
    -x, -y, z,
    x, -y, z,
    x, y, z,
    -x, y, z,
    // back 
    -x, -y, -z,
    -x, y, -z,
    x, y, -z,
    x, -y, -z,
    // top
    -x, y, -z,
    -x, y, z,
    x, y, z,
    x, y, -z,
    // bottom
    -x, -y, -z,
    x, -y, -z,
    x, -y, z,
    -x, -y, z,
    // right
    x, -y, -z,
    x, y, -z,
    x, y, z,
    x,-y, z,
    // left
    -x, -y, -z,
    -x, -y, z,
    -x, y, z,
    -x, y, -z
  ]

  for (let idx = 0; idx < cubeFaceVertex.length; idx+=3) {
    cubeFaceVertex[idx] += center[0]
    cubeFaceVertex[idx+1] += center[1]
    cubeFaceVertex[idx+2] += center[2]
  }

  return cubeFaceVertex
}
