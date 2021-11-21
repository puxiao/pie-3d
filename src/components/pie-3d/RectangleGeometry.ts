import { BufferAttribute, BufferGeometry, Vector3 } from "three";

export type PositionArray = [number, number, number]
export type Point = Vector3 | PositionArray

//由 4 个顶点坐标组成的一个矩形
class RectangleGeometry extends BufferGeometry {

    private _leftTop: Vector3
    private _rightTop: Vector3
    private _rightBottom: Vector3
    private _leftBottom: Vector3

    private _vertices = new Float32Array()
    private _normals = new Float32Array()
    private _uvs = new Float32Array()

    //对于 normal 和 uv 的备忘录：
    //1、由于是一个平面，所以只需针对任意相邻的两条边进行叉乘，计算出法线 normal，整个平面的全部法线都是这个 normal
    //2、uv 的值其实就是 顶点的 x,y 的值，即 左上角(0,1)、右上角(1,1)、左下角(0,0)、右下角(1,0)
    constructor(leftTop: Point, rightTop: Point, rightBottom: Point, leftBottom: Point) {
        super()
        this.type = 'RectangleGeometry'

        this._leftTop = this.pointToVector3(leftTop)
        this._rightTop = this.pointToVector3(rightTop)
        this._rightBottom = this.pointToVector3(rightBottom)
        this._leftBottom = this.pointToVector3(leftBottom)

        this.update()
    }

    private updateVertices() {
        this._vertices = new Float32Array([
            ...this._leftBottom.toArray(),
            ...this._rightBottom.toArray(),
            ...this._rightTop.toArray(),

            ...this._rightTop.toArray(),
            ...this._leftTop.toArray(),
            ...this._leftBottom.toArray()
        ])
    }

    private updateNormals() {
        const leftTopToLeftBottom = this._leftTop.clone().sub(this._leftBottom).normalize()
        const leftTopToRightTop = this._leftTop.clone().sub(this._rightTop).normalize()
        const normal = leftTopToLeftBottom.cross(leftTopToRightTop).normalize()
        const normalArr = normal.toArray()
        this._normals = new Float32Array(Array(6).fill(normalArr).flat())
    }

    private updateUvs() {
        this._uvs = new Float32Array([
            0, 0,
            1, 0,
            1, 1,
            1, 1,
            0, 1,
            0, 0
        ])
    }

    private update() {
        this.updateVertices()
        this.updateNormals()
        this.updateUvs()
        this.setAttribute('position', new BufferAttribute(this._vertices, 3))
        this.setAttribute('normal', new BufferAttribute(this._normals, 3))
        this.setAttribute('uv', new BufferAttribute(this._uvs, 2))
    }

    private pointToArray(point: Point): PositionArray {
        if (point instanceof Vector3) {
            return [point.x, point.y, point.z]
        } else {
            return point
        }
    }

    private pointToVector3(point: Point): Vector3 {
        if (point instanceof Vector3) {
            return point
        } else {
            return new Vector3(point[0],point[1],point[2])
        }
    }

    // get and set
    public get leftTop(): Vector3 {
        return this._leftTop
    }

    public set leftTop(point: Vector3) {
        this._leftTop = point
    }

    public get rightTop(): Vector3 {
        return this._rightTop
    }

    public set rightTop(point: Vector3) {
        this._rightTop = point
    }

    public get rightBottom(): Vector3 {
        return this._rightBottom
    }

    public set rightBottom(point: Vector3) {
        this._rightBottom = point
    }

    public get leftBottom(): Vector3 {
        return this._leftBottom
    }

    public set leftBottom(point: Vector3) {
        this._leftBottom = point
    }

    // public function
    public reset(leftTop: Point, rightTop: Point, rightBottom: Point, leftBottom: Point) {

        this._leftTop = this.pointToVector3(leftTop)
        this._rightTop = this.pointToVector3(rightTop)
        this._rightBottom = this.pointToVector3(rightBottom)
        this._leftBottom = this.pointToVector3(leftBottom)

        this.update()
    }
}

export default RectangleGeometry
