using System.Collections;
using System.Collections.Generic;
using UnityEngine;


//https://www.youtube.com/watch?v=bQdb90KK2l8

public class renderer : MonoBehaviour {

	public Texture2D heightmap;
	public Texture2D heightmapBound;
	public float speed;
	public GameObject obj;
	// Use this for initialization
	void Start () {
		Color[] pixels = heightmap.GetPixels(0,0,heightmap.width, heightmap.height);
		//Color[] pixels2 = heightmapBound.GetPixels(0,0,heightmapBound.width, heightmapBound.height);

		for (int x=0; x<heightmap.width ; x++) {
			for (int y=0; y<heightmap.height ; y++) {
				Color color1 = pixels [(x * heightmap.width) + y];
				//Color color2 = pixels2 [(x * heightmapBound.width) + y];
				obj = GameObject.CreatePrimitive(PrimitiveType.Cube);
				//GameObject obj2 = GameObject.CreatePrimitive(PrimitiveType.rect);
				obj.transform.localScale = new Vector3 (1,(color1.grayscale*20),1);
				obj.transform.position = new Vector3 (x,((color1.grayscale*20)/2),y);
				//obj.renderer.material.color = color;

				obj.GetComponent<Renderer> ().material.color = color1;
			}

		}

	}

//	void update(){
//		orbitAround ();
//	}
//
//	void orbitAround(){
//		transform.RotateAround (obj.transform.position, Vector3.forward, speed=Time.deltaTime);
//	}

}
