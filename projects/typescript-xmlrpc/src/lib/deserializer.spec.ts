import {TestBed} from '@angular/core/testing';
import {deserialize} from './deserializer';
import {applicationError} from './constants';

describe('Deserializer', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('method response', () => {
    const goodInput = `<?xml version="1.0"?>
<methodResponse>
    <params>
        <param>
            <value><string>South Dakota</string></value>
            </param>
        </params>
    </methodResponse>`;
    const result = deserialize(goodInput);
    expect(result).toEqual({value: 'South Dakota'});
  });

  it('fault response', () => {
    const goodInput = `<?xml version="1.0"?>
<methodResponse>
    <fault>
        <value>
            <struct>
                <member>
                    <name>faultCode</name>
                    <value><int>4</int></value>
                    </member>
                <member>
                    <name>faultString</name>
                    <value><string>Too many parameters.</string></value>
                    </member>
                </struct>
            </value>
        </fault>
    </methodResponse>`;
    const result = deserialize(goodInput);
    expect(result).toEqual({faultCode: 4, faultString: 'Too many parameters.'});
  });

  it('process garbage like server errors', () => {
    const badInput = 'This is garbage. Do not fail but return meaningful content.';
    const result = deserialize(badInput);
    expect(result).toEqual(applicationError);
  });
});
