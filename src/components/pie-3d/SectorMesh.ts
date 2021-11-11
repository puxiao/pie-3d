import { CylinderBufferGeometry, Material, Mesh, Object3D } from "three";
import createSectorGeometry from "./createSectorGeometry";
import RectangleGeometry from "./RectangleGeometry";

//创建一个扇形3D对象
class SectorMesh extends Object3D {
    private geometries: [CylinderBufferGeometry, RectangleGeometry, RectangleGeometry]
    private _material: Material
    private _height: number

    constructor(radius: number, height: number, radialSegments: number, heightSegments: number, openEnded: boolean, thetaStart: number, thetaLength: number, material: Material) {
        super()
        this.type = 'SectorMesh'
        this.geometries = createSectorGeometry(radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength)
        this._material = material
        this._height = height

        this.update()
    }

    private update() {
        while (this.children.length > 0) {
            this.remove(this.children[0])
        }

        this.geometries.forEach(geometry => {
            this.add(new Mesh(geometry, this._material))
        })
    }

    public set material(value: Material) {
        this._material = value
        this.update()
    }

    public get material(): Material {
        return this._material
    }

    public get height(): number {
        return this._height
    }

}

export default SectorMesh